output "lambda_function_arns" {
  description = "ARNs of the deployed Lambda functions"
  value       = { for k, v in aws_lambda_function.marketplace_lambda : k => v.arn }
}

output "lambda_function_names" {
  description = "Names of the deployed Lambda functions"
  value       = { for k, v in aws_lambda_function.marketplace_lambda : k => v.function_name }
}


output "lambda_execution_role_arn" {
  description = "IAM Role ARN used by Lambda functions"
  value       = aws_iam_role.lambda_exec_role.arn
}
