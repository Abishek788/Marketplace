# variable "apis" {
#   description = "Map of API Gateway configurations with linked Lambda ARNs"
#   type = map(object({
#     api_name           = string
#     lambda_function_name = string
#     lambda_invoke_arn  = string
#   }))
# }

# variable "region" {
#   description = "AWS region"
#   type        = string
# }
variable "apis" {
  description = "Map of API Gateway configurations"
  type = map(object({
    api_name         = string
    path_part        = string
    lambda_arn       = string
    lambda_function_name = string
  }))
}
variable "region" {
  description = "AWS region"
  type        = string
}