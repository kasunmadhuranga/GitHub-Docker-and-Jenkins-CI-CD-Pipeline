pipeline {
    agent any 
    environment {
        DOCKER_CREDENTIALS_ID = 'kasunfile' // Replace with your secret file ID
        DOCKER_USERNAME = 'kazunm' // Docker username can be hardcoded or stored in another credential
    }
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/kasunmadhuranga/GitHub-Docker-and-Jenkins-CI-CD-Pipeline'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t kazunm/nodeapp-kas:%BUILD_NUMBER% .'
            }
        }
       stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([file(credentialsId: DOCKER_CREDENTIALS_ID, variable: 'DOCKER_PASSWORD_FILE')]) {
                        echo 'Logging into Docker Hub...'
                        bat 'docker logout || true' // Ignore logout errors
                        bat 'docker login -u %DOCKER_USERNAME% --password-stdin < %DOCKER_PASSWORD_FILE%'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    bat 'docker push kazunm/nodeapp-kas:62'
                }
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
   
}
