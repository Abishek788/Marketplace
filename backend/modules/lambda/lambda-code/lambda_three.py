import json
import boto3
import base64
import uuid
import os

# AWS Services Clients
s3 = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")

# Define your S3 bucket and DynamoDB table for mechanic submissions
S3_BUCKET = os.environ.get("S3_BUCKET", "default-bucket-name")
DYNAMODB_TABLE = os.environ.get("DYNAMODB_TABLE", "default-table-name")

def lambda_handler(event, context):
    try:
        print("Received event:", json.dumps(event))
        
        # Extract and parse the nested body
        body = json.loads(event["body"])
        parsed_body = json.loads(body["body"])  # Extract actual payload
        
        image_data = parsed_body["image_data"]  # Base64-encoded image
        image_name = parsed_body["image_name"]
        car_name = parsed_body["car_name"]
        location = parsed_body["location"]
        make = parsed_body["make"]
        model = parsed_body["model"]
        mileage = parsed_body["mileage"]
        description = parsed_body["description"]
        
        # Generate unique filename for S3
        unique_filename = f"{uuid.uuid4()}_{image_name}"
        
        # Decode and upload the image to S3
        image_bytes = base64.b64decode(image_data)
        s3.put_object(Bucket=S3_BUCKET, Key=unique_filename, Body=image_bytes, ContentType="image/jpeg")
        
        # Construct S3 URL
        s3_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{unique_filename}"
        
        # Store data in DynamoDB
        table = dynamodb.Table(DYNAMODB_TABLE)
        table.put_item(
            Item={
                "id": str(uuid.uuid4()),  # Unique ID
                "car_name": car_name,
                "image_name": image_name,
                "image_url": s3_url,
                "location": location,
                "make": make,
                "model": model,
                "mileage": mileage,
                "description": description
            }
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Data stored successfully", "image_url": s3_url}),
        }

    except Exception as e:
        print("Error:", str(e))
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
