data "aws_route53_zone" "moistsquid" {
    name = "moistsquid.co.uk"
    private_zone = false
}

resource "aws_route53_record" "moistsquid_record" {
    zone_id = data.aws_route53_zone.moistsquid.zone_id
    name    = "moistsquid.co.uk"
    type    = "A"

    alias {
        name                   = aws_cloudfront_distribution.moistsquid.domain_name
        zone_id                = aws_cloudfront_distribution.moistsquid.hosted_zone_id
        evaluate_target_health = false
    }
}

resource "aws_route53_record" "www_moistsquid_record" {
    zone_id = data.aws_route53_zone.moistsquid.zone_id
    name    = "www.moistsquid.co.uk"
    type    = "A"

    alias {
        name                   = aws_cloudfront_distribution.moistsquid.domain_name
        zone_id                = aws_cloudfront_distribution.moistsquid.hosted_zone_id
        evaluate_target_health = false
    }
}

resource "aws_route53_record" "cert_validation" {
    for_each = {
        for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
            name   = dvo.resource_record_name
            record = dvo.resource_record_value
            type   = dvo.resource_record_type
        }
    }

    name            = each.value.name
    records         = [each.value.record]
    ttl             = 60
    type            = each.value.type
    zone_id         = data.aws_route53_zone.moistsquid.zone_id
}
