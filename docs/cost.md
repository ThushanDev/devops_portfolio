# Cost and resource notes

- EC2, the NAT gateway and its public IPv4 address, CloudWatch flow logs, storage, S3 state, DynamoDB locking, and outbound traffic may be billable. Free-tier eligibility depends on account age, region, and current AWS terms. The AWS example is not a zero-cost deployment.
- Check the AWS Pricing Calculator and current billing dashboard before provisioning. Set a budget alert before creating resources.
- The default `t3.micro` keeps the example small but cannot comfortably run a full monitoring stack and several app replicas at once. The Helm values use low limits and optional features remain disabled until the available memory is checked.
- Destroy the demonstration cluster after use only after reviewing the plan. State storage is protected from accidental destroy and needs a separate deliberate cleanup process.
- No estimate in this repository is a quote. Review actual regional prices and usage before apply.
