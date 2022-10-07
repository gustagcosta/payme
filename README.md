# PaymeApp

  Aplicativo de gerenciamento de clientes e cobranças, com possibilidade de envio de qrcode para pagamento via pix

### Funcionalidades V1
  - [x] cadastro de usuários
  - [x] login jwt 
  - [x] crud de débitos
  - [x] crud de clientes
  - [x] qrcode para pagamento  
  - [x] frontend 😝😝
    - [x] login
    - [x] cadastro
    - [x] telas de cobranças
    - [x] telas de clientes
    - [x] tela de qrcode

### Refatorações
  - [ ] validações com gokit
  - [ ] logger back + front
  - [ ] feature de envio de email
  - [ ] melhorar tratamento de erro
  - [ ] hook de atualização de cobrança
  - [ ] remover uso de inserção de código manualmente 
  - [ ] melhorar uso de váriaveis de ambiente e configurações
  - [ ] dockerizar

### Extras
  - docker run --name payme -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 -d mysql
