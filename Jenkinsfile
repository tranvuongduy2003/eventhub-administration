pipeline {
    agent {
        node {
            label 'eventhub'
        }
    }
    
    environment {
        IMAGE_TAG = 'latest'
        IMAGE_NAME = 'eventhub.administration'
        REGISTRY_URL = 'tranvuongduy2003'  // Replace with your registry URL
        DOCKER_NETWORK = 'eventhub'
    }
    
    stages {       
        stage('Build') {
            steps {
                script {
                    sh "cp /home/eventhub/eventhub-administration/.env ./.env"

                     // Clean up
                    sh 'docker image prune -a -f'

                     // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin"
                    }

                    // Build Docker image
                    sh "docker build -t ${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG} -f Dockerfile ."
                    
                    // Push to registry
                    sh "docker push ${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    // Clean up
                    sh 'docker image prune -a -f'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Pull latest image
                    sh "docker pull ${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    // Stop and remove existing container
                    sh "docker stop ${IMAGE_NAME} || true"
                    sh "docker rm ${IMAGE_NAME} || true"
                    
                    // Run new container
                    sh """
                        docker run -d \
                        --name ${IMAGE_NAME} \
                        --network ${DOCKER_NETWORK} \
                        -p 3002:80 \
                        ${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }  

    post {
        success {
            script {
                // Safely escape variables and construct JSON
                def jsonText = "[🔥SUCCESS][eventhub-administration] Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} success🔥🔥🔥! For more info: ${env.BUILD_URL}"
                def payload = groovy.json.JsonOutput.toJson([
                    chat_id: "1934277483",
                    text: jsonText,
                    disable_notification: false
                ])
                // Use double quotes for sh and escape the payload
                sh "curl -X POST -H 'Content-Type: application/json' -d '${payload}' 'https://api.telegram.org/bot7896259001:AAElRMt5EoUn-KtzmLYPehaFaS9Sc1nU094/sendMessage'"
            }
        }
        failure {
            script {
                def jsonText = "[💀FAILED][eventhub-administration] Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} failed😭😭😭! For more info: ${env.BUILD_URL}"
                def payload = groovy.json.JsonOutput.toJson([
                    chat_id: "1934277483",
                    text: jsonText,
                    disable_notification: false
                ])
                sh "curl -X POST -H 'Content-Type: application/json' -d '${payload}' 'https://api.telegram.org/bot7896259001:AAElRMt5EoUn-KtzmLYPehaFaS9Sc1nU094/sendMessage'"
            }
        }
    }
}