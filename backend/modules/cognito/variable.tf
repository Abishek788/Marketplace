variable "user_pool_name" {
  description = "Name of the Cognito User Pool"
  type        = string
}

variable "user_pool_client_name" {
  description = "Name of the Cognito User Pool Client"
  type        = string
}

variable "user_pool_domain" {
  description = "Domain name for the Cognito User Pool"
  type        = string
}

variable "password_min_length" {
  description = "Minimum password length"
  type        = number
  default     = 8
}

variable "require_uppercase" {
  description = "Require uppercase letters in the password"
  type        = bool
  default     = true
}

variable "require_lowercase" {
  description = "Require lowercase letters in the password"
  type        = bool
  default     = true
}

variable "require_numbers" {
  description = "Require numbers in the password"
  type        = bool
  default     = true
}

variable "require_symbols" {
  description = "Require symbols in the password"
  type        = bool
  default     = false
}

variable "generate_secret" {
  description = "Whether to generate a secret for the user pool client"
  type        = bool
  default     = false
}

variable "create_identity_pool" {
  description = "Whether to create a Cognito Identity Pool"
  type        = bool
  default     = false
}

variable "identity_pool_name" {
  description = "Name of the Cognito Identity Pool"
  type        = string
  default     = "MarketplaceIdentityPool"
}

variable "allow_unauthenticated_identities" {
  description = "Allow unauthenticated identities in the identity pool"
  type        = bool
  default     = false
}
