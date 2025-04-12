pipeline {
    agent any

    environment {
        SONARQUBE_URL = 'http://192.168.100.105:9000'  
    }

     parameters {
        string(name: 'projetkey', defaultValue: '', description: 'Clé du projet SonarQube')
        string(name: 'url', defaultValue: '', description: 'URL du dépôt Git')
    }

    stages {
        stage('Cloner le Repository') {
            steps {
                git branch: 'main', url: params.url
            }   
        }

        stage('SonarQube Test') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-sonarr', variable: 'SONARQUBE_TOKEN')]) {
                    script {
                        def scannerHome = tool 'SonarScanner'  
                        sh """
                            $scannerHome/bin/sonar-scanner \
                                -Dsonar.projectKey=${params.projetkey}\
                                -Dsonar.sources=. \
                                -Dsonar.host.url=$SONARQUBE_URL \
                                -Dsonar.login=\$SONARQUBE_TOKEN
                        """
                    }
                }
            }
        }


        
    }
}
