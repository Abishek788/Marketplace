resource "aws_cognito_user_pool" "user_pool" {
  name = var.user_pool_name

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = var.password_min_length
    require_uppercase = var.require_uppercase
    require_lowercase = var.require_lowercase
    require_numbers   = var.require_numbers
    require_symbols   = var.require_symbols
  }

  schema {
    name = "email"
    attribute_data_type = "String"
    required = true
    mutable = false
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = var.user_pool_client_name
  user_pool_id = aws_cognito_user_pool.user_pool.id
  generate_secret = var.generate_secret

  explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]
}

resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain       = "marketplace-auth-${random_string.suffix.result}"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "random_string" "suffix" {
  length  = 4
  special = false
  upper   = false
}

resource "aws_cognito_identity_pool" "identity_pool" {
  count                = var.create_identity_pool ? 1 : 0
  identity_pool_name   = var.identity_pool_name
  allow_unauthenticated_identities = var.allow_unauthenticated_identities

  cognito_identity_providers {
    client_id = aws_cognito_user_pool_client.user_pool_client.id
    provider_name = aws_cognito_user_pool.user_pool.endpoint
  }
}
