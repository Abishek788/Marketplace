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
        
        # Extract and parse the nested body from the event
        body = json.loads(event["body"])
        parsed_body = json.loads(body["body"])  # Extract the actual payload
        
        # Extract mechanic submission fields
        image_data = parsed_body["image_data"]  # Base64-encoded image data
        image_name = parsed_body["image_name"]
        name = parsed_body["name"]
        location = parsed_body["location"]
        role = parsed_body["role"]
        experience = parsed_body["experience"]
        description = parsed_body["description"]
        
        # Generate a unique filename for the image in S3
        unique_filename = f"{uuid.uuid4()}_{image_name}"
        
        # Decode the image and upload it to S3
        image_bytes = base64.b64decode(image_data)
        s3.put_object(
            Bucket=S3_BUCKET, 
            Key=unique_filename, 
            Body=image_bytes, 
            ContentType="image/jpeg"
        )
        
        # Construct the S3 URL for the uploaded image
        s3_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{unique_filename}"
        
        # Store mechanic submission details in DynamoDB
        table = dynamodb.Table(DYNAMODB_TABLE)
        table.put_item(
            Item={
                "id": str(uuid.uuid4()),  # Unique ID for the record
                "name": name,
                "image_name": image_name,
                "image_url": s3_url,
                "location": location,
                "role": role,
                "experience": experience,
                "description": description
            }
        )
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Data stored successfully", 
                "image_url": s3_url
            }),
        }

    except Exception as e:
        print("Error:", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
