output "api_gateway_urls" {
  description = "A map of API Gateway invoke URLs keyed by API name"
  value = { for key, stage in aws_api_gateway_stage.dev : key => stage.invoke_url }
}

output "api_gateway_id" {
  description = "A map of API Gateway IDs keyed by API name"
  value = { for key, api in aws_api_gateway_rest_api.marketplace_api : key => api.id }
}

output "api_gateway_invoke_url" {
  description = "A map of API Gateway stage invoke URLs keyed by API name"
  value = { for key, stage in aws_api_gateway_stage.dev : key => stage.invoke_url }
}


