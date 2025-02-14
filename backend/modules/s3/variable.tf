variable "bucket_name" {
    description = "The name of the bucket for the image"
    type = string
  
}
variable "aws_region" {
  description = "AWS region for Lambda deployment"
  type        = string
  default     = "us-east-1"
}
