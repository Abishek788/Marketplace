# IAM Role for Lambda Execution 
resource "aws_iam_role" "lambda_exec_role" {
    name = "marketplace_lambda_execution_role"

    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [{
            Action = "sts:AssumeRole"
            Effect = "Allow",
            Principal = {
                Service = "lambda.amazonaws.com"
            }
        }]
    })
}

# Attach Basic Execution Role for CloudWatch Logs 
resource "aws_iam_policy_attachment" "lambda_logs_policy" {
    name       = "lambda_logs_policy_attachment"
    roles      = [aws_iam_role.lambda_exec_role.name]
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Policy to Allow DynamoDB Access 
resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name = "marketplace_lambda_dynamodb_policy"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ],
        Resource = [
          	"arn:aws:dynamodb:us-east-1:*:table/cartable",
				    "arn:aws:dynamodb:us-east-1:*:table/mechanicstable" # Modify region if needed
        ]
      }
    ]
  })
}

# Policy to Allow S3 Access 
resource "aws_iam_role_policy" "lambda_s3_policy" {
  name = "marketplace_lambda_s3_policy"
  role = aws_iam_role.lambda_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = [
          "arn:aws:s3:::marketplace-product-images-bucket-us132134dwefe4",
				  "arn:aws:s3:::marketplace-product-images-bucket-us132134dwefe4/*"
        ]
      }
    ]
  })
}

resource "aws_lambda_function" "marketplace_lambda" {
  for_each = var.lambda_functions

  function_name = each.value.function_name
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = each.value.handler
  runtime       = each.value.runtime

  environment {
    variables = {
      S3_BUCKET      = each.value.products_table
      DYNAMODB_TABLE = each.value.orders_table
    }
  }

  depends_on = [
    aws_iam_role_policy.lambda_dynamodb_policy,
    aws_iam_role_policy.lambda_s3_policy
  ]

  filename         = "${path.module}/${each.value.filename}"
  source_code_hash = filebase64sha256("${path.module}/${each.value.filename}")
}