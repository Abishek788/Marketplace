output "s3_bucket_name" {
  description = "The name of the created S3 bucket"
  value       = module.s3.bucket_name
}

output "cartable_name" {
  description = "The name of the Cart DynamoDB table"
  value       = module.cartable.table_name
}

output "mechanicstable_name" {
  description = "The name of the Mechanics DynamoDB table"
  value       = module.mechanicstable.table_name
}

output "lambda_function_arns" {
  value = module.lambda.lambda_function_arns
}

output "lambda_function_names" {
  value = module.lambda.lambda_function_names
}


output "api_gateway_endpoints" {
  value = module.api_gateway.api_gateway_invoke_url
}



output "cognito_user_pool_id" {
  description = "ID of the Cognito User Pool"
  value       = module.cognito.user_pool_id
}

output "cognito_user_pool_arn" {
  description = "ARN of the Cognito User Pool"
  value       = module.cognito.user_pool_arn
}
