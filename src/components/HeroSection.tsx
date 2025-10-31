<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Körper & Geist Coaching</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            overflow-x: hidden;
        }

        .navbar {
            background: white;
            padding: 15px 30px;
            border-bottom: 1px solid #e5e5e5;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }

        .navbar-content {
            max-width: 1200px;
            margin: 0 auto;
            font-size: 18px;
            font-weight: 500;
            color: #333;
        }

        .hero-section {
            background: linear-gradient(to bottom, #1a0000 0%, #2d0a0a 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding-top: 60px;
        }

        .hero-content {
            max-width: 800px;
            text-align: center;
            position: relative;
            z-index: 10;
        }

        .hero-image-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 600px;
            z-index: 1;
        }

        .hero-image-container img {
            width: 100%;
            height: auto;
            display: block;
        }

        .hero-text {
            position: relative;
            z-index: 10;
            margin-top: -80px;
        }

        .hero-title {
            font-size: 64px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.1;
        }

        .hero-title .white {
            color: white;
        }

        .hero-title .red {
            color: #e74c3c;
        }

        .hero-subtitle {
            color: white;
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 300px;
            line-height: 1.4;
        }

        .cta-button {
            background: #e74c3c;
            color: white;
            padding: 20px 50px;
            font-size: 20px;
            font-weight: 600;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            text-decoration: none;
            margin-bottom: 60px;
        }

        .cta-button:hover {
            background: #c0392b;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
        }

        .cta-button:active {
            transform: translateY(0);
        }

        .lightning {
            font-size: 24px;
        }

        .trust-badges {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .trust-badge {
            background: white;
            padding: 15px 30px;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: 500;
            color: #333;
            transition: all 0.3s ease;
            cursor: default;
        }

        .trust-badge.clickable {
            cursor: pointer;
        }

        .trust-badge.red {
            background: #e74c3c;
            color: white;
            animation: pulse 2s ease-in-out infinite;
        }

        .trust-badge.red:hover {
            background: #c0392b;
            transform: scale(1.05);
        }

        .trust-badge.red:active {
            transform: scale(0.98);
            animation: click-bounce 0.3s ease;
        }

        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
            }
        }

        @keyframes click-bounce {
            0%, 100% {
                transform: scale(0.98);
            }
            50% {
                transform: scale(0.95);
            }
        }

        .star {
            color: #e74c3c;
        }

        .icon {
            font-size: 20px;
        }

        .testimonials-section {
            padding: 80px 20px;
            background: #f8f9fa;
            text-align: center;
        }

        .testimonials-section h2 {
            font-size: 42px;
            margin-bottom: 50px;
            color: #333;
        }

        .testimonials-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .testimonial-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .testimonial-card .stars {
            color: #e74c3c;
            font-size: 24px;
            margin-bottom: 15px;
        }

        .testimonial-card p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .testimonial-card .name {
            font-weight: 600;
            color: #333;
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: 42px;
            }

            .hero-subtitle {
                font-size: 18px;
                margin-bottom: 200px;
            }

            .trust-badges {
                flex-direction: column;
                align-items: center;
            }

            .trust-badge {
                width: 100%;
                max-width: 300px;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-content">
            COACHING
        </div>
    </nav>

    <section class="hero-section">
        <div class="hero-image-container">
            <!-- Hier würde normalerweise das Bild der beiden Personen eingefügt werden -->
            <div style="width: 100%; height: 600px; background: transparent;"></div>
        </div>
        
        <div class="hero-content">
            <div class="hero-text">
                <h1 class="hero-title">
                    <span class="white">KÖRPER </span><span class="red">& GEIST</span>
                </h1>
                <p class="hero-subtitle">
                    Deine Fitness-Transformation mit<br>
                    ganzheitlichem Online Coaching
                </p>

                <a href="#consultation" class="cta-button">
                    <span class="lightning">⚡</span>
                    KOSTENLOSES GESPRÄCH
                </a>

                <div class="trust-badges">
                    <div class="trust-badge">
                        <span class="star">★</span>
                        4.9★ Bewertung
                    </div>
                    <a href="#testimonials" class="trust-badge red clickable">
                        <span class="icon">⚡</span>
                        Unzählige Erfolgsgeschichten
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section id="testimonials" class="testimonials-section">
        <h2>Erfolgsgeschichten unserer Kunden</h2>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p>"Dank dem ganzheitlichen Coaching habe ich nicht nur 15kg abgenommen, sondern auch meine innere Balance gefunden. Beste Entscheidung meines Lebens!"</p>
                <p class="name">- Sarah M.</p>
            </div>
            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p>"Nach nur 3 Monaten fühle ich mich fitter als je zuvor. Das Team geht wirklich auf individuelle Bedürfnisse ein und motiviert kontinuierlich."</p>
                <p class="name">- Michael K.</p>
            </div>
            <div class="testimonial-card">
                <div class="stars">★★★★★</div>
                <p>"Als vielbeschäftigte Mutter hatte ich Bedenken, ob ich es schaffe. Aber das flexible Online-Coaching hat perfekt in meinen Alltag gepasst!"</p>
                <p class="name">- Julia R.</p>
            </div>
        </div>
    </section>

    <script>
        // Smooth scroll für die Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>