pipeline {
	agent {
		label 'docker'
	    }
	environment {
		imagename = 'headmost'
		Dockerhub = 'DOCKERHUBCREDS'
		registry = 'stepan93/headmost'
	}
	stages {
		stage('Checkout code from git') {
			steps {
				git(
					url: 'https://github.com/GagoEgh/headmost',
					credentialsId: "GITHUBCREDS",
					branch: "new-task"
				)
			}
		}
		stage('Build docker image'){
			steps {
				script
				{
					dockerImage = docker.build registry + ":$BUILD_NUMBER"
				}
			}
		}
		stage('Push image to Dockerhub repo'){
			steps {
				script	
				{
					docker.withRegistry( '', Dockerhub ) {
						dockerImage.push()
					}
				}
			}
		}

        stage('Deploy to Server'){
			steps {
				sh "chmod 777 ./jenkins_script/remove_old_container.sh"
				sh "./jenkins_script/remove_old_container.sh"
				sh "docker run -p 3265:80 -d --name gift4u $registry:$BUILD_NUMBER"
			}
		}
	}
}
