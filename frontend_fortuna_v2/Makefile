build:
	docker build -t react-app .

build-local:
	docker build \
		-t fortuna_client:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:5000/api \
		-f Dockerfile.production .

build-production:
	docker build \
		-t fortuna_client:production \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://fortunacombat.com/api \
		-f Dockerfile.production .