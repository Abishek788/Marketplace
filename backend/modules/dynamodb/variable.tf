variable "table_name" {
  description = "The name of the DynamoDB table"
  type        = string
}

variable "hash_key" {
  description = "Partition key for the table"
  type        = string
  default     = "id"
}
