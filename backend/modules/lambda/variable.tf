variable "lambda_functions" {
  description = "Map of Lambda function configurations"
  type = map(object({
    function_name  = string
    handler        = string
    runtime        = string
    filename       = string
    products_table = string
    orders_table   = string
  }))

  default = {
    lambda1 = {
      function_name = "marketplace_lambda_one"
      handler       = "lambda-one.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_one.zip"
      products_table = "marketplace-product-images-bucket-us1321344"
      orders_table   = "cartable"
    }
    lambda2 = {
      function_name = "marketplace_lambda_two"
      handler       = "lambda-two.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_two.zip"
      products_table = "marketplace-product-images-bucket-us1321344"
      orders_table   = "mechanicstable"
    }
    lambda3 = {
      function_name = "marketplace_lambda_three"
      handler       = "lambda-three.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_three.zip"
      products_table = "marketplace-product-images-bucket-us1321344"
      orders_table   = "cartable"
    }
    lambda4 = {
      function_name = "marketplace_lambda_four"
      handler       = "lambda-four.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_four.zip"
      products_table = "marketplace-product-images-bucket-us1321344"
      orders_table   = "mechanicstable"
    }
  }
}
variable "dynamodb_table_arns" {
  description = "List of ARNs for DynamoDB tables accessible by Lambda"
  type        = list(string)
  default     = [
    "arn:aws:dynamodb:us-east-1:*:table/marketplace-product-images-bucket-us1321344",
    "arn:aws:dynamodb:us-east-1:*:table/cartable",
    "arn:aws:dynamodb:us-east-1:*:table/marketplace-product-images-bucket-us1321344",
    "arn:aws:dynamodb:us-east-1:*:table/mechanicstable",
    "arn:aws:dynamodb:us-east-1:*:table/marketplace-product-images-bucket-us1321344",
    "arn:aws:dynamodb:us-east-1:*:table/cartable",
    "arn:aws:dynamodb:us-east-1:*:table/marketplace-product-images-bucket-us1321344",
    "arn:aws:dynamodb:us-east-1:*:table/mechanicstable"
  ]
}

variable "s3_bucket_name" {
  description = "S3 bucket name for storing product images"
  type        = string
  default     = "marketplace-product-images-bucket-us1321344"
}

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}


# variable "lambda_code_path" {
#   description = "Path to the Lambda deployment package"
#   type        = string
#   default     = "../lambda-code/marketplace_lambda.zip"
# }
