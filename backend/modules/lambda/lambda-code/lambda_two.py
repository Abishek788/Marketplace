import json
import boto3
from decimal import Decimal
import os


# Custom JSON Encoder to handle Decimal
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError


# Get environment variables
DYNAMODB_TABLE = os.environ.get("DYNAMODB_TABLE", "default-table-name")

# Initialize DynamoDB resource
dynamodb = boto3.resource("dynamodb")

# Reference the table using the environment variable
table = dynamodb.Table(DYNAMODB_TABLE)

print(f"Connected to DynamoDB table: {DYNAMODB_TABLE}")


def lambda_handler(event, context):
    try:
        # Scan DynamoDB to get all items
        response = table.scan()
        items = response.get('Items', [])

        # Handle pagination if there are more items (LastEvaluatedKey)
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items.extend(response.get('Items', []))
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Enable CORS if needed
            },
            'body': json.dumps(items, default=decimal_default)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
