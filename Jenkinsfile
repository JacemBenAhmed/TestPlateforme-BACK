pipeline {
    agent any

    environment {
        SONARQUBE_URL = 'http://192.168.100.150:9000'  
        SNYK_TOKEN = credentials('Snyk')
    }

     parameters {
        string(name: 'projetkey', defaultValue: '', description: 'Clé du projet SonarQube')
        string(name: 'url', defaultValue: '', description: 'URL du dépôt Git')
         string(name:'SNYK_TOKEN',defaultValue:'',description:'Snyk_token')
    }

    stages {
        stage('Cloner le Repository') {
            steps {

                script {
                    sh 'rm -rf /home/vm/modules/*'

                sh """
                cd /home/vm/modules
                git clone ${params.url} 
                """               
                
                 } 
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

        stage('Snyk Test') {
            steps {
                script {
                    sh """
                    snyk auth ${SNYK_TOKEN}  
                    cd /home/vm/modules/${projetkey}
                    snyk code test --json > report.json
                    """
                }
            }
        }
        


        
    }
}
