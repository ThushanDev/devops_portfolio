.PHONY: install test lint build run scan tf-fmt tf-validate tf-plan tf-apply tf-destroy deploy loadtest clean confirm

install:
	cd app && npm ci

test:
	cd app && npm test

lint:
	cd app && npm run lint

build:
	docker build -f app/Dockerfile -t devops-portfolio:local .

run:
	docker run --rm -p 3000:3000 devops-portfolio:local

scan:
	trivy fs --scanners vuln,secret,misconfig .

tf-fmt:
	terraform -chdir=infra/terraform fmt -check -recursive

tf-validate:
	terraform -chdir=infra/terraform init -backend=false
	terraform -chdir=infra/terraform validate

tf-plan:
	terraform -chdir=infra/terraform plan

confirm:
	@printf 'Type YES to continue: '; read answer; test "$$answer" = "YES"

tf-apply: confirm
	terraform -chdir=infra/terraform apply

tf-destroy: confirm
	terraform -chdir=infra/terraform destroy

deploy: confirm
	helm upgrade --install portfolio k8s/helm/portfolio --namespace portfolio --create-namespace

loadtest:
	k6 run tests/load/k6.js

clean:
	cd app && npm run clean
