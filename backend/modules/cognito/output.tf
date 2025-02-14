output "user_pool_id" {
  description = "ID of the Cognito User Pool"
  value       = aws_cognito_user_pool.user_pool.id
}

output "user_pool_arn" {
  description = "ARN of the Cognito User Pool"
  value       = aws_cognito_user_pool.user_pool.arn
}

output "user_pool_client_id" {
  description = "ID of the Cognito User Pool Client"
  value       = aws_cognito_user_pool_client.user_pool_client.id
}

output "user_pool_domain" {
  description = "Cognito User Pool Domain"
  value       = aws_cognito_user_pool_domain.user_pool_domain.domain
}

output "identity_pool_id" {
  description = "ID of the Cognito Identity Pool (if created)"
  value       = var.create_identity_pool ? aws_cognito_identity_pool.identity_pool[0].id : null
}
