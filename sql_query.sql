-- Criar Banco:
CREATE DATABASE ProductTest;

-- Alterar para o banco criado:
USE ProductTest;

-- Criar Tabela:
CREATE TABLE Produto (
	Id INT PRIMARY KEY IDENTITY (1,1),
	Nome VARCHAR (50) NOT NULL,
	ValorVenda VARCHAR (50) NOT NULL,
	Imagem VARCHAR(MAX) NOT NULL
);