#!/bin/sh

echo "Build json-merger"
cd profiling-images/json-merger
docker buildx build --platform linux/amd64,linux/arm64,linux/arm -o type=oci,dest=- . > json-merger.tar

cd ../..

echo "Build text-statistican"
cd profiling-images/text-statistican
docker buildx build --platform linux/amd64,linux/arm64,linux/arm -o type=oci,dest=- . > text-statistican.tar

cd ../..

echo "Build text-metadata-extractor"
cd profiling-images/text-metadata-extractor
docker buildx build --platform linux/amd64,linux/arm64,linux/arm -o type=oci,dest=- . > text-metadata-extractor.tar

cd ../..

echo "Build text-language-guesser"
cd profiling-images/text-language-guesser
docker buildx build --platform linux/amd64,linux/arm64,linux/arm -o type=oci,dest=- . > text-language-guesser.tar

cd ../..

echo "Build text-keyword-extractor"
cd profiling-images/text-keyword-extractor
docker buildx build --platform linux/amd64,linux/arm64,linux/arm -o type=oci,dest=- . > text-keyword-extractor.tar

cd ../..

echo "Build text-core-phrase-extractor"
cd profiling-images/text-core-phrase-extractor
docker buildx build --platform linux/amd64,linux/arm64,linux/arm -o type=oci,dest=- . > text-core-phrase-extractor.tar

echo "Done!"