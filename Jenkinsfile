pipeline {
    agent any

    environment {
        SONARQUBE_URL = 'http://192.168.100.130:9000'  
    }

    stages {
        stage('Cloner le Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/JacemBenAhmed/membership_card_odoo.git'
            }
        }

        stage('SonarQube Test') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-sonarr', variable: 'SONARQUBE_TOKEN')]) {
                    script {
                        def scannerHome = tool 'SonarScanner'  
                        sh """
                            $scannerHome/bin/sonar-scanner \
                                -Dsonar.projectKey=odoo_test\
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
