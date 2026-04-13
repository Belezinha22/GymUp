<?php
session_start();
include "conexao.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GymUp | Definir metas</title>
    <link rel="stylesheet" href="../css/metas.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="shortcut icon" href="../img/logo/Logo-removebg-preview.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast/dist/css/iziToast.min.css">

</head>

<body>
    <main>
        <header id="header">
            <div class="logo">
                <img src="../img/logo/Logo-removebg-preview.png" alt="Logo FitPower">
                <h2>GymUp</h2>
            </div>
            <button class="menu-toggle" id="menu-toggle"><i class="fa-solid fa-bars"></i></button>
            <nav id="navbar">
                <ul>
                    <li><a href="../php/index.php">Início</a></li>
                    <li><a href="../php/meta_criar.php">Metas</a></li>
                    <li><a href="../php/sobre.php">Sobre</a></li>
                    <li><a href="../php/contato.php">Contato</a></li>

                    <?php if (isset($_SESSION['usuario_id'])): ?>
                        <!-- Se estiver logado -->
                        <li><a href="perfil.php">Perfil</a></li>
                    <?php else: ?>
                        <!-- Se não estiver logado -->
                        <li><a href="login.php">Entrar</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </header>
        <div>
            <div class="scroll-dots">
                <a href="#ini_">
                    <div class="dot active" id="iniciantes">
                        <p class="dot-text">
                            I
                        </p>
                    </div>
                </a>
                <a href="#hip_">
                    <div class="dot" id="hipertrofia">
                        <p class="dot-text">
                            H
                        </p>
                    </div>
                </a>
                <a href="#ema_def">
                    <div class="dot" id="E_D">
                        <p class="dot-text">
                            E
                        </p>
                    </div>
                </a>
                <a href="#perf_cond">
                    <div class="dot" id="P_C">
                        <p class="dot-text">
                            P
                        </p>
                    </div>
                </a>
                <a href="#bem_sau">
                    <div class="dot" id="B_S">
                        <p class="dot-text">
                            B
                        </p>
                    </div>
                </a>
            </div>

            <section class="" id="ini_">
                <div class="card">
                    <a href="" class="card-link">
                        <img src="../img/general/iniciantes.jpg" alt="" class="card-image">
                        <h2 class="card-title">
                            Criar o hábito de treinar regularmente, melhorar o condicionamento físico, aprender a
                            executar
                            exercícios corretamente.
                        </h2>
                        <div style="height: 50px; display: flex; justify-content: space-between; align-items: center;">
                            <button class="card-button">
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                            <div class="joker" style="opacity: 0; pointer-events: none; user-select: none;"></div>
                        </div>
                    </a>
                </div>
                <div class="iniciantes-desc section-desc">
                    <h2 class="section-title">
                        Iniciantes
                    </h2>
                    <h1>
                        O plano perfeito para quem está começando
                    </h1>
                    <p>
                        Descubra um programa completo pensado para quem quer iniciar com segurança e eficiência. Combine
                        treinos simples, progressivos e eficazes que ensinam o corpo e a mente a evoluir passo a passo.
                    </p>
                    <div class="badges">
                        <span class="badge">Sem complicação • Aprenda o básico do jeito certo</span>
                        <span class="badge">2–3 dias/semana • 30–45min</span>
                        <span class="badge">Para quem está começando agora</span>
                    </div>
                    <a href="content/inciantes.php" class="BTN choose-btn-left" data-meta="ini_">
                        <div class="choose-btn-left-icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M7.828 13l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414L7.828 11H20v2z"
                                    fill="currentColor"></path>
                            </svg>
                        </div>
                        Escolher
                </div>
                </a>

                </a>
        </div>
        </section>
        <section class="reverse" id="hip_">
            <div class="card">
                <a href="" class="card-link">
                    <img src="../img/general/hipertrofia.jpg" alt="" class="card-image">
                    <h2 class="card-title">
                        Aumentar a força e resistência muscular, melhorar a postura e estabilidade corporal,
                        desenvolver
                        grupos musculares específicos
                    </h2>
                    <div style="height: 50px; display: flex; justify-content: space-between; align-items: center;">
                        <button class="card-button">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <div class="joker" style="opacity: 0; pointer-events: none; user-select: none;"></div>
                    </div>
                </a>
            </div>
            <div class="iniciantes-desc section-desc">
                <h2 class="section-title">
                    Hipertrofia
                </h2>
                <h1>
                    O plano perfeito para hipertrofia
                </h1>
                <p>
                    Descubra um plano completo de hipertrofia que combina treinos inteligentes, alimentação
                    estratégica
                    e recuperação adequada. Ideal para quem quer transformar o corpo com resultados reais e
                    consistentes.
                </p>
                <div class="badges">
                    <span class="badge">Sem achismo • baseado em boas práticas</span>
                    <span class="badge">3 dias/semana • 45–60min</span>
                    <span class="badge">Para qualquer idade</span>
                </div>
                <a href="content/hipertrofia.php" class="BTN choose-btn" data-meta="hip_">
                    Escolher
                    <div class="choose-btn-icon">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                </a>
            </div>
        </section>
        <section class="" id="ema_def">
            <div class="card">
                <a href="" class="card-link">
                    <img src="../img/general/emag_def.jpg" alt="" class="card-image">
                    <h2 class="card-title">
                        Reduzir percentual de gordura corporal, aumentar o gasto calórico diário, melhorar a
                        resistência
                        cardiovascular
                    </h2>
                    <div style="height: 50px; display: flex; justify-content: space-between; align-items: center;">
                        <button class="card-button">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <div class="joker" style="opacity: 0; pointer-events: none; user-select: none;"></div>
                    </div>
                </a>
            </div>
            <div class="iniciantes-desc section-desc">
                <h2 class="section-title">
                    EMAGRECIMENTO E DEFINIÇÃO
                </h2>
                <h1>
                    O plano perfeito para perder gordura e definir o corpo
                </h1>
                <p>
                    Um método estruturado para acelerar o metabolismo, reduzir gordura corporal e conquistar
                    definição
                    muscular. Treinos dinâmicos, nutrição inteligente e foco na consistência.
                </p>
                <div class="badges">
                    <span class="badge">Queima de gordura eficiente</span>
                    <span class="badge">Treinos curtos • Alta intensidade</span>
                    <span class="badge">Resultados visíveis e sustentáveis</span>
                </div>
                <a href="" class="BTN choose-btn-left" data-meta="e_d">
                    <div class="choose-btn-left-icon">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M7.828 13l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414L7.828 11H20v2z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    Escolher
                </a>
            </div>
        </section>
        <section class="reverse" id="perf_cond">
            <div class="card">
                <a href="" class="card-link">
                    <img src="../img/general/perf_cond.jpg" alt="" class="card-image">
                    <h2 class="card-title">
                        Aumentar a resistência aeróbica, melhorar o desempenho em treinos funcionais ou de alta
                        intensidade e aumentar a mobilidade
                    </h2>
                    <div style="height: 50px; display: flex; justify-content: space-between; align-items: center;">
                        <button class="card-button">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <div class="joker" style="opacity: 0; pointer-events: none; user-select: none;"></div>
                    </div>
                </a>
            </div>
            <div class="iniciantes-desc section-desc">
                <h2 class="section-title">
                    PERFORMANCE E CONDICIONAMENTO
                </h2>
                <h1>
                    O plano certo para elevar seu desempenho
                </h1>
                <p>
                    Desenvolva força, resistência e agilidade com treinos voltados à performance. Ideal para quem
                    busca
                    melhorar o condicionamento físico e ultrapassar limites.
                </p>
                <div class="badges">
                    <span class="badge">Foco em potência e resistência</span>
                    <span class="badge">4–5 dias/semana • 45–75min</span>
                    <span class="badge">Para atletas e praticantes avançados</span>
                </div>
                <a href="" class="BTN choose-btn" data-meta="p_c">
                    Escolher
                    <div class="choose-btn-icon">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                </a>
            </div>
        </section>
        <section class="" id="bem_sau">
            <div class="card">
                <a href="" class="card-link">
                    <img src="../img/general/bem_saude.jpg" alt="" class="card-image">
                    <h2 class="card-title">
                        Reduzir dores musculares e melhorar a postura, aumentar a qualidade do sono e disposição
                        diária,
                        desenvolver uma rotina de treinos equilibrada.
                    </h2>
                    <div style="height: 50px; display: flex; justify-content: space-between; align-items: center;">
                        <button class="card-button">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <div class="joker" style="opacity: 0; pointer-events: none; user-select: none;"></div>
                    </div>
                </a>
            </div>
            <div class="iniciantes-desc section-desc">
                <h2 class="section-title">
                    BEM-ESTAR E SAÚDE
                </h2>
                <h1>
                    O plano perfeito para cuidar do corpo e da mente
                </h1>
                <p>
                    Um programa voltado à saúde integral, com exercícios equilibrados, alongamentos e práticas que
                    melhoram disposição, sono e qualidade de vida.
                </p>
                <div class="badges">
                    <span class="badge">Movimente-se sem pressa</span>
                    <span class="badge">Foco em vitalidade e equilíbrio</span>
                    <span class="badge">Para todas as idades e níveis</span>
                </div>
                <a href="" class="BTN choose-btn-left" data-meta="b_s">
                    <div class="choose-btn-left-icon">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M7.828 13l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414L7.828 11H20v2z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    Escolher
                </a>
            </div>
        </section>
        <!-- <section class="hipertrofia" id="2">
            </section> -->
        </div>
    </main>



    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://unpkg.com/scrollreveal"></script>
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
    <script src="../js/metas.js"></script>
    <script>
        document.querySelectorAll(".BTN").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                let plano = btn.getAttribute("data-meta");
                let desc = btn.closest(".section-desc").querySelector("p").innerText;

                fetch("../php/salvar_meta.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: "plano=" + encodeURIComponent(plano) + "&descricao=" + encodeURIComponent(desc)
                })
                    .then(r => r.text())
                    .then(resp => {
                        if (resp === "ok") {
                            iziToast.success({
                                title: "Meta definida",
                                message: "Meta salva com sucesso!",
                                position: "topCenter"
                            });

                            setTimeout(() => {
                                window.location.href = "content/hipertrofia.php";
                            }, 1000);
                        }
                    })
            })
        })
    </script>


</body>

</html>