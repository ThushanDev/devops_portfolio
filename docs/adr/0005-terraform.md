# ADR 0005: Terraform for infrastructure

- Status: accepted
- Context: the AWS network and host should be reviewable and repeatable.
- Decision: define AWS resources as Terraform modules with remote state, encryption, versioning, and locking.
- Consequences: bootstrap state storage separately and review every plan. Never commit state or apply without explicit approval.
