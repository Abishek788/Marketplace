terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}
module "api_gateway" {
  source = "./modules/api_gateway"
  region = "us-east-1"

  apis = {
    for key in keys(module.lambda.lambda_function_names) : key => {
      api_name             = "Marketplace-${key}"
      lambda_function_name = module.lambda.lambda_function_names[key]
      lambda_invoke_arn    = module.lambda.lambda_function_arns[key]
       path_part            = key # Ensure a valid API path is set
       lambda_arn           = module.lambda.lambda_function_arns[key] # Fix incorrect key
    }
  }
}





module "cognito" {
  source                  = "./modules/cognito"
  user_pool_name          = "MarketplaceUserPool"
  user_pool_client_name   = "MarketplaceUserPoolClient"
  user_pool_domain        = "marketplace-auth"
  create_identity_pool    = true
  identity_pool_name      = "MarketplaceIdentityPool"
}



module "cartable" {
  source      = "./modules/dynamodb"
  table_name  = "cartable"
  hash_key    = "id"
}

module "mechanicstable" {
  source      = "./modules/dynamodb"
  table_name  = "mechanicstable"
  hash_key    = "id"
}


module "lambda" {
  source = "./modules/lambda"

  lambda_functions = {
    lambda1 = {
      function_name = "marketplace_lambda_one"
      handler       = "lambda-one.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_one.zip"
      products_table = "marketplace-product-images-bucket-us132134dwefe4"
      orders_table   = "cartable"
    }
    lambda2 = {
      function_name = "marketplace_lambda_two"
      handler       = "lambda-two.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_two.zip"
      products_table = "marketplace-product-images-bucket-us132134dwefe4"
      orders_table   = "mechanicstable"
    }
    lambda3 = {
      function_name = "marketplace_lambda_three"
      handler       = "lambda-three.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_three.zip"
      products_table = "marketplace-product-images-bucket-us132134dwefe4"
      orders_table   = "cartable"
    }
    lambda4 = {
      function_name = "marketplace_lambda_four"
      handler       = "lambda-four.lambda_handler"
      runtime       = "python3.9"
      filename      = "lambda_four.zip"
      products_table = "marketplace-product-images-bucket-us132134dwefe4"
      orders_table   = "mechanicstable"
    }
  }
}

module "s3" {
  source      = "./modules/s3"
  bucket_name = "marketplace-product-images-bucket-us132134dwefe4"
}




