resource "aws_s3_bucket" "moistsquid" {
    bucket = "moistsquid.co.uk"
    acl    = "private"
    policy = data.aws_iam_policy_document.moistsquid_bucket_policy.json

    website {
        index_document = "index.html"
        error_document = "error.html"
    }

    force_destroy = false

    lifecycle {
        prevent_destroy = true
    }
}

data "aws_iam_policy_document" "moistsquid_bucket_policy" {
    statement {
        sid = "AllowReadFromAll"

        actions = [
            "s3:GetObject",
        ]

        resources = [
            "arn:aws:s3:::moistsquid.co.uk/*"
        ]

        principals {
            type        = "*"
            identifiers = ["*"]
        }
    }
    
}

resource "aws_s3_bucket_object" "index" {
    bucket       = "moistsquid.co.uk"
    key          = "index.html"
    source       = "../src/index.html"
    content_type = "text/html"
}

resource "aws_s3_bucket_object" "error" {
    bucket       = "moistsquid.co.uk"
    key          = "error.html"
    source       = "../src/error.html"
    content_type = "text/html"
}
