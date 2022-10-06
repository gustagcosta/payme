# PaymeApp

  Aplicativo de gerenciamento de clientes e cobranças, com possibilidade de envio de qrcode para pagamento via pix

### Funcionalidades
  - [x] cadastro de usuários
  - [x] login jwt 
  - [x] crud de débitos
  - [x] crud de clientes
  - [x] qrcode para pagamento  
  - [ ] frontend 😝😝
    - [x] login
    - [x] cadastro
    - [ ] telas de cobranças
    - [ ] telas de clientes
    - [ ] tela de qrcode + envio de e-mail
  - [ ] hook de atualização de cobrança  

### Refatorações
  - [ ] validações com gokit
  - [ ] logger back + front

### Extras
  - docker run --name payme -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 -d mysql
