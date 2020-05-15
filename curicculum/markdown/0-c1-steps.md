- Open Terminal: Use spotlight - the magnifying glass in top right corner of your screen - to search for the application called Terminal. Click it to open a new Shell.
- Install Homebrew: We will follow a slightly modified version of [these instructions through Homebrew commands](https://www.datacamp.com/community/tutorials/homebrew-install-use)

  - Copy and paste the command below (everything after the `$`) and paste it into the terminal and press enter. If you see an error message, run the next command to install xcode command line tools. Otherwise, you can skip the next step.
    ```shell
      $ xcode-select -p
    ```
  - Copy and paste the command below and press enter. You will be prompted for your Mac OS login password. Enter your password then press enter. You will need to accept the terms, and it may take a while to install. Once it is complete, run the first command again, to confirm the installation.
    ```shell
      $ sudo xcode-select --install
    ```
  - Install Homebrew with the command below
    ```shell
      $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
  - Install NodeJS using Homebew:
    ```shell
      $ brew install node
    ```
  - Download the project repository from GitHub:
    ```shell
      $ git clone https://github.com/techintern-school/ise-projects.git
    ```
  - Navigate to the projects directory
    ```shell
      $ cd ise-projects
    ```
  - Install the TIS CLI and the projects application
    ```shell
      $ npm install
    ```
  - Run the setup command to link your account from the website to the CLI
    ```shell
      $ npm run setup
    ```
  - Paste your user ID then hit enter - you can find this by clicking on the menu in the top left of the app, then clicking the account button, and copying the value
  - Navigate to the challenge 1 directory for project 0
    ```shell
      $ cd project-0/challenge-1/
    ```
  - Submit your challenge for evaluation
    ```shell
      $ npm run submit
    ```
  - If you have done this correctly, the challenge in the web portal will say complete.
