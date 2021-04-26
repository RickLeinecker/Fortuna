build-dev:
	cd frontend_fortuna_v2 && $(MAKE) build-dev
	cd backend_fortuna_v2 && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

###

build-local:
	cd frontend_fortuna_v2 && $(MAKE) build-local
	cd backend_fortuna_v2 && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

###

build-production:
	cd frontend_fortuna_v2 && $(MAKE) build-production
	cd backend_fortuna_v2 && $(MAKE) build

run-production:
	ENV=production docker-compose -f -d docker-compose-production.yml up

SSH_STRING:=root@165.22.39.162

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/