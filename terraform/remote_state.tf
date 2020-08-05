terraform {
    backend "s3" {
        bucket         = "moistsquid-remote-state"
        key            = "global/s3/moistsquid/terraform.tfstate"
        region         = "eu-west-2"
    }
}
