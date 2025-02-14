
# resource "aws_api_gateway_rest_api" "marketplace_api" {
#   for_each = var.apis

#   name        = "MarketplaceAPI-${each.key}"
#   description = "API for ${each.value.api_name}"

#   endpoint_configuration {
#     types = ["REGIONAL"]
#   }
# }

# # Create API Gateway Resource (Path)
# resource "aws_api_gateway_resource" "marketplace_api_resources" {
#   for_each    = var.apis
#   rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
#   parent_id   = aws_api_gateway_rest_api.marketplace_api[each.key].root_resource_id
#   path_part   = each.value.path_part  # Ensure this is provided in var.apis
# }

# # Create API Gateway Method (POST)
# resource "aws_api_gateway_method" "marketplace_method" {
#   for_each    = var.apis
#   rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
#   resource_id = aws_api_gateway_resource.marketplace_api_resources[each.key].id
#   http_method = "POST"
#   authorization = "NONE"
# }

# # Integrate API Gateway with Lambda
# resource "aws_api_gateway_integration" "lambda_integration" {
#   for_each = var.apis

#   rest_api_id             = aws_api_gateway_rest_api.marketplace_api[each.key].id
#   resource_id             = aws_api_gateway_resource.marketplace_api_resources[each.key].id
#   http_method             = aws_api_gateway_method.marketplace_method[each.key].http_method
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${each.value.lambda_arn}/invocations"

#   depends_on = [aws_api_gateway_method.marketplace_method]  # Ensure API method exists first
# }

# # Deploy API Gateway
# resource "aws_api_gateway_deployment" "api_deployment" {
#   for_each    = var.apis
#   rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id

#   triggers = {
#     redeployment = sha1(jsonencode([
#       aws_api_gateway_resource.marketplace_api_resources[each.key].id,
#       aws_api_gateway_method.marketplace_method[each.key].id,
#       aws_api_gateway_integration.lambda_integration[each.key].id
#     ]))
#   }

#   lifecycle {
#     create_before_destroy = true
#   }

#   depends_on = [aws_api_gateway_integration.lambda_integration] # Ensure integration exists before deploying
# }

# # Create API Gateway Stage (DEV)
# resource "aws_api_gateway_stage" "dev" {
#   for_each    = var.apis
#   stage_name  = "dev"
#   rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
#   deployment_id = aws_api_gateway_deployment.api_deployment[each.key].id
# }

# # Allow API Gateway to invoke Lambda
# resource "aws_lambda_permission" "apigw_lambda_permission" {
#   for_each = var.apis

#   action        = "lambda:InvokeFunction"
#   function_name = each.value.lambda_function_name
#   principal     = "apigateway.amazonaws.com"
#   statement_id  = "AllowExecutionFromAPIGateway"
#   source_arn    = "${aws_api_gateway_rest_api.marketplace_api[each.key].execution_arn}/*/*"
# }
# Create API Gateway
resource "aws_api_gateway_rest_api" "marketplace_api" {
  for_each = var.apis

  name        = "MarketplaceAPI-${each.key}"
  description = "API for ${each.value.api_name}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Create API Gateway Resource (Path)
resource "aws_api_gateway_resource" "marketplace_api_resources" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  parent_id   = aws_api_gateway_rest_api.marketplace_api[each.key].root_resource_id
  path_part   = each.value.path_part  # Ensure this is provided in var.apis
}

# Create API Gateway Method (POST)
resource "aws_api_gateway_method" "marketplace_method" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  resource_id = aws_api_gateway_resource.marketplace_api_resources[each.key].id
  http_method = "POST"
  authorization = "NONE"
}

# Enable CORS: Create OPTIONS Method for API Gateway
resource "aws_api_gateway_method" "cors_options" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  resource_id = aws_api_gateway_resource.marketplace_api_resources[each.key].id
  http_method = "OPTIONS"
  authorization = "NONE"
}

# Enable CORS: Add Mock Integration for OPTIONS
resource "aws_api_gateway_integration" "cors_integration" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  resource_id = aws_api_gateway_resource.marketplace_api_resources[each.key].id
  http_method = aws_api_gateway_method.cors_options[each.key].http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = <<EOF
{
  "statusCode": 200
}
EOF
  }
}

# Enable CORS: Add Method Response for OPTIONS
resource "aws_api_gateway_method_response" "cors_method_response" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  resource_id = aws_api_gateway_resource.marketplace_api_resources[each.key].id
  http_method = aws_api_gateway_method.cors_options[each.key].http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}

# Enable CORS: Add Integration Response for OPTIONS
resource "aws_api_gateway_integration_response" "cors_integration_response" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  resource_id = aws_api_gateway_resource.marketplace_api_resources[each.key].id
  http_method = aws_api_gateway_method.cors_options[each.key].http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,Authorization'"
  }

  depends_on = [aws_api_gateway_integration.cors_integration]
}

# Integrate API Gateway with Lambda
resource "aws_api_gateway_integration" "lambda_integration" {
  for_each = var.apis

  rest_api_id             = aws_api_gateway_rest_api.marketplace_api[each.key].id
  resource_id             = aws_api_gateway_resource.marketplace_api_resources[each.key].id
  http_method             = aws_api_gateway_method.marketplace_method[each.key].http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${each.value.lambda_arn}/invocations"

  depends_on = [aws_api_gateway_method.marketplace_method]
}

# Deploy API Gateway
resource "aws_api_gateway_deployment" "api_deployment" {
  for_each    = var.apis
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.marketplace_api_resources[each.key].id,
      aws_api_gateway_method.marketplace_method[each.key].id,
      aws_api_gateway_integration.lambda_integration[each.key].id
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [aws_api_gateway_integration.lambda_integration]
}

# Create API Gateway Stage (DEV)
resource "aws_api_gateway_stage" "dev" {
  for_each    = var.apis
  stage_name  = "dev"
  rest_api_id = aws_api_gateway_rest_api.marketplace_api[each.key].id
  deployment_id = aws_api_gateway_deployment.api_deployment[each.key].id
}

# Allow API Gateway to invoke Lambda
resource "aws_lambda_permission" "apigw_lambda_permission" {
  for_each = var.apis

  action        = "lambda:InvokeFunction"
  function_name = each.value.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  statement_id  = "AllowExecutionFromAPIGateway"
  source_arn    = "${aws_api_gateway_rest_api.marketplace_api[each.key].execution_arn}/*/*"
}
