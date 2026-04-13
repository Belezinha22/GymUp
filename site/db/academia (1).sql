-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/11/2025 às 03:30
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `academia`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `exercicios`
--

CREATE TABLE `exercicios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `grupo_muscular` varchar(50) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico`
--

CREATE TABLE `historico` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `data` date NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `cintura` decimal(5,2) DEFAULT NULL,
  `quadril` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `historico`
--

INSERT INTO `historico` (`id`, `usuario_id`, `data`, `peso`, `cintura`, `quadril`) VALUES
(2, 18, '2025-11-04', 70.00, 55.00, 58.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `metas`
--

CREATE TABLE `metas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `status` enum('Em planejamento','Em andamento','Concluída','Cancelada') NOT NULL DEFAULT 'Em andamento'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `planos`
--

CREATE TABLE `planos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `dia_semana` varchar(20) NOT NULL,
  `exercicios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `prs`
--

CREATE TABLE `prs` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `exercicio` varchar(100) NOT NULL,
  `carga` decimal(5,2) NOT NULL,
  `data` date NOT NULL,
  `anotacao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `prs`
--

INSERT INTO `prs` (`id`, `usuario_id`, `exercicio`, `carga`, `data`, `anotacao`) VALUES
(2, 18, 'Supino reto', 120.00, '2025-11-04', 'meta: 120\r\n'),
(3, 18, 'Supino reto com barra', 80.00, '2025-11-05', ''),
(4, 18, 'Tríceps francês', 15.00, '2025-11-05', ''),
(5, 18, 'Crucifixo na máquina', 80.00, '2025-11-05', 'consigo fazer progressao de carga');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pr_usuario`
--

CREATE TABLE `pr_usuario` (
  `usuario_id` int(11) NOT NULL,
  `exercicio_id` int(11) NOT NULL,
  `pr` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `suplementos`
--

CREATE TABLE `suplementos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `modo_uso` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `treinos`
--

CREATE TABLE `treinos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `dia_semana` enum('segunda','terca','quarta','quinta','sexta','sabado','domingo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `treino_exercicios`
--

CREATE TABLE `treino_exercicios` (
  `id` int(11) NOT NULL,
  `treino_id` int(11) NOT NULL,
  `exercicio_id` int(11) NOT NULL,
  `series` int(11) NOT NULL,
  `repeticoes` int(11) NOT NULL,
  `carga` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `idade` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `altura` decimal(4,2) DEFAULT NULL,
  `objetivo` varchar(50) DEFAULT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `plano` varchar(100) DEFAULT NULL,
  `plano_desc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `idade`, `email`, `senha`, `peso`, `altura`, `objetivo`, `data_cadastro`, `plano`, `plano_desc`) VALUES
(18, 'GABRIEL BACCHIEGA DE JESUS', 18, 'gabrielbacchiega37@gmail.com', '$2y$10$lWbmJ7n25zniYXVJR5x8SeghovdA/0dxKtO4nHoDQFA/nw89LSQLi', 70.00, 1.76, 'Hipertrofia', '2025-11-03 18:18:16', 'ini_', 'Descubra um programa completo pensado para quem quer iniciar com segurança e eficiência. Combine treinos simples, progressivos e eficazes que ensinam o corpo e a mente a evoluir passo a passo.');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `exercicios`
--
ALTER TABLE `exercicios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `historico`
--
ALTER TABLE `historico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `planos`
--
ALTER TABLE `planos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `prs`
--
ALTER TABLE `prs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `pr_usuario`
--
ALTER TABLE `pr_usuario`
  ADD PRIMARY KEY (`usuario_id`,`exercicio_id`);

--
-- Índices de tabela `suplementos`
--
ALTER TABLE `suplementos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `treinos`
--
ALTER TABLE `treinos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `treino_exercicios`
--
ALTER TABLE `treino_exercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `treino_id` (`treino_id`),
  ADD KEY `exercicio_id` (`exercicio_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `exercicios`
--
ALTER TABLE `exercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `historico`
--
ALTER TABLE `historico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `metas`
--
ALTER TABLE `metas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de tabela `planos`
--
ALTER TABLE `planos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `prs`
--
ALTER TABLE `prs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `suplementos`
--
ALTER TABLE `suplementos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `treinos`
--
ALTER TABLE `treinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `treino_exercicios`
--
ALTER TABLE `treino_exercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `historico`
--
ALTER TABLE `historico`
  ADD CONSTRAINT `historico_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `metas`
--
ALTER TABLE `metas`
  ADD CONSTRAINT `metas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `planos`
--
ALTER TABLE `planos`
  ADD CONSTRAINT `planos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `prs`
--
ALTER TABLE `prs`
  ADD CONSTRAINT `prs_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `treinos`
--
ALTER TABLE `treinos`
  ADD CONSTRAINT `treinos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `treino_exercicios`
--
ALTER TABLE `treino_exercicios`
  ADD CONSTRAINT `treino_exercicios_ibfk_1` FOREIGN KEY (`treino_id`) REFERENCES `treinos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `treino_exercicios_ibfk_2` FOREIGN KEY (`exercicio_id`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
