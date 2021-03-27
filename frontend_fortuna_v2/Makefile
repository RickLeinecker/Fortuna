build-dev:
	docker build -t react-app .

build-local:
	docker build \
		-t fortunaclientprod:local \
		--build-arg CADDYFILE=Caddyfile.local \
	 	-f Dockerfile.production .

build-production:
	docker build \
	-t fortunaclientprod:production \
	--build-arg CADDYFILE=Caddyfile.production \
	-f Dockerfile.production .