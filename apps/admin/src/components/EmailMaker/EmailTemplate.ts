export function rpMainTemplate(htmlContent: string) {
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
            body,
            table,
            td,
            p,
            a,
            li,
            blockquote {
                -webkit-text-size-adjust: 100% !important;
                -ms-text-size-adjust: 100% !important;
            }

            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }

            /* not showing broken image thingie */
            img {
                -ms-interpolation-mode: bicubic !important;
                border: 0 !important;
                outline: none !important;
                text-decoration: none !important;
                display: block !important;
            }

            /* dark mode */
            [data-ogsc] *,
            [data-ogsb] *,
            .darkmode *,
            [data-darkreader] *,
            u + .body * {
                background-color: transparent !important;
            }

            [data-ogsc] .email-container,
            [data-ogsb] .email-container,
            .darkmode .email-container {
                background-color: #1a1a1a !important;
            }

            [data-ogsc] .main-bg,
            [data-ogsb] .main-bg,
            .darkmode .main-bg {
                background-color: #0d0d0d !important;
            }

            [data-ogsc] .header-bg,
            [data-ogsb] .header-bg,
            .darkmode .header-bg {
                background-color: #1a1a1a !important;
            }

            [data-ogsc] .info-bg,
            [data-ogsb] .info-bg,
            .darkmode .info-bg {
                background-color: #2a2a2a !important;
            }

            [data-ogsc] a,
            [data-ogsb] a,
            .darkmode a {
                color: #3366CC !important;
                text-decoration: none !important;
                border-bottom: 1px solid #3366CC !important;
            }

            body {
                margin: 0 !important;
                padding: 0 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                background-color: #0d0d0d !important;
                color: #ffffff !important;
                line-height: 1.6 !important;
            }

            .main-bg {
                background-color: #0d0d0d !important;
                padding: 20px 0 !important;
                width: 100% !important;
            }

            .email-container {
                max-width: 600px !important;
                width: 100% !important;
                margin: 0 auto !important;
                background-color: #1a1a1a !important;
                border: 2px solid #ff0000 !important;
                overflow: hidden !important;
                position: relative !important;
            }

            .top-border {
                height: 4px !important;
                background: repeating-linear-gradient(
                    90deg,
                    #ff0000 0px,
                    #ff0000 20px,
                    #1a1a1a 20px,
                    #1a1a1a 40px
                ) !important;
            }

            .header-table {
                width: 100% !important;
                border-collapse: collapse !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
            }

            .header-bg {
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                text-align: center !important;
                padding: 0 !important;
                position: relative !important;
                min-height: 120px !important;
                vertical-align: middle !important;
            }

            .header-image-container {
                position: relative !important;
                display: block !important;
                width: 100% !important;
                min-height: 120px !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                text-align: center !important;
                vertical-align: middle !important;
            }

            .header-image {
                max-width: 100% !important;
                height: auto !important;
                display: block !important;
                margin: 0 auto !important;
                border: none !important;
                vertical-align: middle !important;
            }

            /* Enhanced fallback styling */
            .header-fallback {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                display: none !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                text-align: center !important;
                vertical-align: middle !important;
            }

            .header-fallback-inner {
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 90% !important;
                max-width: 400px !important;
            }

            /* Outlook-specific fallback */
            .header-fallback-outlook {
                text-align: center !important;
                padding: 40px 20px !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                min-height: 120px !important;
                vertical-align: middle !important;
            }

            .header-fallback-outlook table {
                width: 100% !important;
                height: 120px !important;
                border-collapse: collapse !important;
            }

            .header-fallback-outlook td {
                vertical-align: middle !important;
                text-align: center !important;
            }

            .year-badge {
                font-size: 12px !important;
                font-weight: bold !important;
                color: #cccccc !important;
                letter-spacing: 2px !important;
                margin: 0 0 15px 0 !important;
                text-transform: uppercase !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                display: block !important;
                line-height: 1.2 !important;
            }

            .header-title {
                margin: 0 !important;
                font-size: 28px !important;
                font-weight: bold !important;
                letter-spacing: 3px !important;
                text-transform: uppercase !important;
                color: #ffffff !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                display: block !important;
                line-height: 1.1 !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
            }

            .title-separator {
                color: #ff0000 !important;
                margin: 0 10px !important;
                font-weight: normal !important;
                text-shadow: 0 0 10px #ff0000 !important;
            }

            .header-decoration {
                margin: 15px 0 0 0 !important;
                height: 2px !important;
                width: 80px !important;
                background: linear-gradient(
                    90deg,
                    transparent,
                    #ff0000,
                    transparent
                ) !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }

            .header-bottom-border {
                height: 3px !important;
                background-color: #ff0000 !important;
                position: relative !important;
            }

            .header-bottom-border::after {
                content: "" !important;
                position: absolute !important;
                bottom: -2px !important;
                left: 0 !important;
                right: 0 !important;
                height: 2px !important;
                background: repeating-linear-gradient(
                    90deg,
                    #ff0000 0px,
                    #ff0000 10px,
                    transparent 10px,
                    transparent 20px
                ) !important;
            }

            .content-table {
                width: 100% !important;
                border-collapse: collapse !important;
            }

            .content-area {
                padding: 40px 30px !important;
                background-color: #1a1a1a !important;
                color: #e0e0e0 !important;
            }

            .welcome-text {
                font-size: 16px !important;
                margin: 0 0 25px 0 !important;
                color: #e0e0e0 !important;
                line-height: 1.6 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
            }

            .update-table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 25px 0 !important;
            }

            .update-box {
                background-color: #2a2a2a !important;
                border: 2px solid #ff0000 !important;
                padding: 20px !important;
                text-align: center !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                font-size: 16px !important;
                color: #ffffff !important;
                position: relative !important;
            }

            .update-link {
                /* color: #ff0000 !important; */
                text-decoration: none !important;
                font-weight: bold !important;
                font-size: 16px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                /* border-bottom: 1px solid #ff0000 !important; */
            }

            /* Outlook link styling */
            /* span.MsoHyperlink {
                color: #ff0000 !important;
                text-decoration: none !important;
                border-bottom: 1px solid #ff0000 !important;
            }

            span.MsoHyperlinkFollowed {
                color: #cc0000 !important;
                text-decoration: none !important;
                border-bottom: 1px solid #cc0000 !important;
            } */

            .section-title {
                font-size: 18px !important;
                font-weight: bold !important;
                margin: 30px 0 20px 0 !important;
                color: #ffffff !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                position: relative !important;
                padding-bottom: 10px !important;
            }

            .section-title::after {
                content: "" !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 2px !important;
                background: linear-gradient(
                    90deg,
                    #ff0000,
                    #ff4444,
                    #ff0000
                ) !important;
            }

            .accent-line {
                width: 100% !important;
                height: 2px !important;
                background: linear-gradient(
                    90deg,
                    #ff0000,
                    #ff4444,
                    #ff0000
                ) !important;
                margin: 20px 0 !important;
                border: none !important;
            }

            .info-table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 20px 0 !important;
                border: 1px solid #333333 !important;
            }

            .info-bg {
                background-color: #1a1a1a !important;
            }

            .info-row {
                border-bottom: 1px solid #333333 !important;
            }

            .info-row:last-child {
                border-bottom: none !important;
            }

            .info-label {
                font-weight: bold !important;
                color: #ffffff !important;
                width: 140px !important;
                padding: 12px 15px !important;
                vertical-align: top !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                font-size: 14px !important;
                background-color: #2a2a2a !important;
                border-right: 2px solid #ff0000 !important;
            }

            .nested-link {
                color: #ff0000 !important;
                text-decoration: none !important;
                border-bottom: 1px solid #ff0000 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                word-break: break-all !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
                display: inline-block !important;
            }
            
            .info-value {
                color: #e0e0e0 !important;
                padding: 12px 15px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                font-size: 14px !important;
                background-color: #1a1a1a !important;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
                max-width: 0 !important;
            }
            
            a {
                color: #3366CC !important;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
            }
            
            @media only screen and (max-width: 600px) {
                .content-area {
                    padding: 20px 15px !important;
                    color: #e0e0e0 !important;
                }
            
                .info-label,
                .info-value {
                    display: block !important;
                    width: 100% !important;
                    padding: 8px 15px !important;
                    border-right: none !important;
                    font-size: 12px !important;
                }
            
                .info-label {
                    padding-bottom: 4px !important;
                    border-bottom: 1px solid #ff0000 !important;
                }
            
                .header-title {
                    font-size: 22px !important;
                    letter-spacing: 2px !important;
                }
            
                .header-image-container {
                    min-height: 100px !important;
                }
            
                .header-fallback-outlook {
                    padding: 25px 15px !important;
                }
            
                .year-badge {
                    font-size: 11px !important;
                }
            
                .title-separator {
                    margin: 0 5px !important;
                }
            
                .nested-link {
                    font-size: 12px !important;
                    word-break: break-all !important;
                }
            }

            .resume-table {
                margin-top: 10px !important;
            }

            .resume-button {
                background: linear-gradient(
                    135deg,
                    #ff0000,
                    #cc0000
                ) !important;
                color: #ffffff !important;
                padding: 12px 24px !important;
                text-decoration: none !important;
                display: inline-block !important;
                font-weight: bold !important;
                font-size: 14px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                border: 2px solid #ff0000 !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
            }

            .footer-table {
                width: 100% !important;
                border-collapse: collapse !important;
            }

            .footer-area {
                background-color: #0d0d0d !important;
                padding: 20px !important;
                text-align: center !important;
                font-size: 14px !important;
                color: #888888 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                position: relative !important;
            }

            /* Footer top border */
            .footer-top-border {
                height: 2px !important;
                background-color: #ff0000 !important;
                position: relative !important;
            }

            .footer-top-border::before {
                content: "" !important;
                position: absolute !important;
                top: -2px !important;
                left: 0 !important;
                right: 0 !important;
                height: 2px !important;
                background: repeating-linear-gradient(
                    90deg,
                    #ff0000 0px,
                    #ff0000 10px,
                    transparent 10px,
                    transparent 20px
                ) !important;
            }

            .fallback-no-transform {
                padding: 40px 20px !important;
                text-align: center !important;
            }
        </style>
    </head>
    <body>
        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            class="main-bg"
        >
            <tr>
                <td align="center">
                    <table
                        class="email-container"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                    >
                        <!-- Top geometric border -->
                        <tr>
                            <td class="top-border"></td>
                        </tr>

            <tr>
                <td>
                    <table
                        class="header-table"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                    >
                        <tr>
                            <td class="header-bg">
                                
                                <!-- Outlook Fallback -->
                                <!--[if mso]>
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 100%);">
                                    <tr>
                                        <td class="header-fallback-outlook">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td style="vertical-align: middle; text-align: center; padding: 40px 20px;">
                                                        <div class="year-badge" style="font-size: 12px; font-weight: bold; color: #cccccc; letter-spacing: 2px; margin: 0 0 15px 0; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                                                            2025 PRESENTS
                                                        </div>
                                                        <div class="header-title" style="margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.1;">
                                                            REFLECTIONS<span style="color: #ff0000; margin: 0 10px;">|</span>PROJECTIONS
                                                        </div>
                                                        <div class="header-decoration" style="margin: 15px auto 0; height: 2px; width: 80px; background: linear-gradient(90deg, transparent, #ff0000, transparent);"></div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <![endif]-->
                                
                                <!-- NON OUTLOOK -->
                                <!--[if !mso]><!-->
                                <div class="header-image-container">
                                    <img
                                        src="https://rp-web-site.pages.dev/email_header.png"
                                        alt=""
                                        class="header-image"
                                        style="display: block; width: 100%; height: auto; max-width: 600px;"
                                        onerror="this.style.display='none'; this.parentNode.querySelector('.header-fallback').style.display='block';"
                                    />
                                    
                                    <!-- Enhanced fallback for failed image loads -->
                                    <div class="header-fallback">
                                        <div class="header-fallback-inner">
                                            <div class="year-badge">2025 PRESENTS</div>
                                            <div class="header-title">
                                                REFLECTIONS<span class="title-separator">|</span>PROJECTIONS
                                            </div>
                                            <div class="header-decoration"></div>
                                        </div>
                                    </div>
                                </div>
                                <!--<![endif]-->
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

                        <tr>
                            <td class="header-bottom-border"></td>
                        </tr>

                        <!-- CONTENT -->
                        <tr>
                            <td>
                                <table
                                    class="content-table"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tr>
                                        <td class="content-area">
                                            

                                            ${htmlContent}

                                            <!-- <table
                                                class="update-table"
                                                cellpadding="0"
                                                cellspacing="0"
                                                border="0"
                                            >
                                                <tr>
                                                    <td class="update-box">
                                                        Need to update your
                                                        registration?
                                                        <a
                                                            href="#nope"
                                                            class="update-link"
                                                            >Return to the
                                                            registration form</a>
                                                        to edit your responses!
                                                    </td>
                                                </tr>
                                            </table> -->
                                       </td>
                                   </tr>
                               </table>
                           </td>
                       </tr>

                       <tr>
                           <td class="footer-top-border"></td>
                       </tr>

                       <tr>
                           <td>
                               <table
                                   class="footer-table"
                                   cellpadding="0"
                                   cellspacing="0"
                                   border="0"
                               >
                                   <tr>
                                       <td class="footer-area">
                                           R|P 2025 • Reflections | Projections
                                       </td>
                                   </tr>
                               </table>
                           </td>
                       </tr>
                   </table>
               </td>
           </tr>
       </table>
   </body>
</html>`;
}

export function rpEmptyTemplate(htmlContent: string) {
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
            body,
            table,
            td,
            p,
            a,
            li,
            blockquote {
                -webkit-text-size-adjust: 100% !important;
                -ms-text-size-adjust: 100% !important;
            }

            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }

            /* not showing broken image thingie */
            img {
                -ms-interpolation-mode: bicubic !important;
                border: 0 !important;
                outline: none !important;
                text-decoration: none !important;
                display: block !important;
            }

            /* dark mode */
            [data-ogsc] *,
            [data-ogsb] *,
            .darkmode *,
            [data-darkreader] *,
            u + .body * {
                background-color: transparent !important;
            }

            [data-ogsc] .email-container,
            [data-ogsb] .email-container,
            .darkmode .email-container {
                background-color: #1a1a1a !important;
            }

            [data-ogsc] .main-bg,
            [data-ogsb] .main-bg,
            .darkmode .main-bg {
                background-color: #0d0d0d !important;
            }

            [data-ogsc] .header-bg,
            [data-ogsb] .header-bg,
            .darkmode .header-bg {
                background-color: #1a1a1a !important;
            }

            [data-ogsc] .info-bg,
            [data-ogsb] .info-bg,
            .darkmode .info-bg {
                background-color: #2a2a2a !important;
            }

            [data-ogsc] a,
            [data-ogsb] a,
            .darkmode a {
                color: #3366CC !important;
                text-decoration: none !important;
                border-bottom: 1px solid #3366CC !important;
            }

            body {
                margin: 0 !important;
                padding: 0 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                background-color: #0d0d0d !important;
                color: #ffffff !important;
                line-height: 1.6 !important;
            }

            .main-bg {
                background-color: #0d0d0d !important;
                padding: 20px 0 !important;
                width: 100% !important;
            }

            .email-container {
                max-width: 600px !important;
                width: 100% !important;
                margin: 0 auto !important;
                background-color: #1a1a1a !important;
                border: 2px solid #ff0000 !important;
                overflow: hidden !important;
                position: relative !important;
            }

            .top-border {
                height: 4px !important;
                background: repeating-linear-gradient(
                    90deg,
                    #ff0000 0px,
                    #ff0000 20px,
                    #1a1a1a 20px,
                    #1a1a1a 40px
                ) !important;
            }

            .header-table {
                width: 100% !important;
                border-collapse: collapse !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
            }

            .header-bg {
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                text-align: center !important;
                padding: 0 !important;
                position: relative !important;
                min-height: 120px !important;
                vertical-align: middle !important;
            }

            .header-image-container {
                position: relative !important;
                display: block !important;
                width: 100% !important;
                min-height: 120px !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                text-align: center !important;
                vertical-align: middle !important;
            }

            .header-image {
                max-width: 100% !important;
                height: auto !important;
                display: block !important;
                margin: 0 auto !important;
                border: none !important;
                vertical-align: middle !important;
            }

            /* Enhanced fallback styling */
            .header-fallback {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                display: none !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                text-align: center !important;
                vertical-align: middle !important;
            }

            .header-fallback-inner {
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 90% !important;
                max-width: 400px !important;
            }

            /* Outlook-specific fallback */
            .header-fallback-outlook {
                text-align: center !important;
                padding: 40px 20px !important;
                background: linear-gradient(
                    135deg,
                    #1a1a1a 0%,
                    #2a1a1a 100%
                ) !important;
                min-height: 120px !important;
                vertical-align: middle !important;
            }

            .header-fallback-outlook table {
                width: 100% !important;
                height: 120px !important;
                border-collapse: collapse !important;
            }

            .header-fallback-outlook td {
                vertical-align: middle !important;
                text-align: center !important;
            }

            .year-badge {
                font-size: 12px !important;
                font-weight: bold !important;
                color: #cccccc !important;
                letter-spacing: 2px !important;
                margin: 0 0 15px 0 !important;
                text-transform: uppercase !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                display: block !important;
                line-height: 1.2 !important;
            }

            .header-title {
                margin: 0 !important;
                font-size: 28px !important;
                font-weight: bold !important;
                letter-spacing: 3px !important;
                text-transform: uppercase !important;
                color: #ffffff !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                display: block !important;
                line-height: 1.1 !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
            }

            .title-separator {
                color: #ff0000 !important;
                margin: 0 10px !important;
                font-weight: normal !important;
                text-shadow: 0 0 10px #ff0000 !important;
            }

            .header-decoration {
                margin: 15px 0 0 0 !important;
                height: 2px !important;
                width: 80px !important;
                background: linear-gradient(
                    90deg,
                    transparent,
                    #ff0000,
                    transparent
                ) !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }

            .header-bottom-border {
                height: 3px !important;
                background-color: #ff0000 !important;
                position: relative !important;
            }

            .header-bottom-border::after {
                content: "" !important;
                position: absolute !important;
                bottom: -2px !important;
                left: 0 !important;
                right: 0 !important;
                height: 2px !important;
                background: repeating-linear-gradient(
                    90deg,
                    #ff0000 0px,
                    #ff0000 10px,
                    transparent 10px,
                    transparent 20px
                ) !important;
            }

            .content-table {
                width: 100% !important;
                border-collapse: collapse !important;
            }

            .content-area {
                padding: 40px 30px !important;
                background-color: #1a1a1a !important;
                color: #e0e0e0 !important;
            }

            .welcome-text {
                font-size: 16px !important;
                margin: 0 0 25px 0 !important;
                color: #e0e0e0 !important;
                line-height: 1.6 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
            }

            .update-table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 25px 0 !important;
            }

            .update-box {
                background-color: #2a2a2a !important;
                border: 2px solid #ff0000 !important;
                padding: 20px !important;
                text-align: center !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                font-size: 16px !important;
                color: #ffffff !important;
                position: relative !important;
            }

            .update-link {
                /* color: #ff0000 !important; */
                text-decoration: none !important;
                font-weight: bold !important;
                font-size: 16px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                border-bottom: 1px solid #ff0000 !important;
            }

            /* Outlook link styling */
            /* span.MsoHyperlink {
                color: #ff0000 !important;
                text-decoration: none !important;
                border-bottom: 1px solid #ff0000 !important;
            }

            span.MsoHyperlinkFollowed {
                color: #cc0000 !important;
                text-decoration: none !important;
                border-bottom: 1px solid #cc0000 !important;
            } */

            .section-title {
                font-size: 18px !important;
                font-weight: bold !important;
                margin: 30px 0 20px 0 !important;
                color: #ffffff !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                position: relative !important;
                padding-bottom: 10px !important;
            }

            .section-title::after {
                content: "" !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 2px !important;
                background: linear-gradient(
                    90deg,
                    #ff0000,
                    #ff4444,
                    #ff0000
                ) !important;
            }

            .accent-line {
                width: 100% !important;
                height: 2px !important;
                background: linear-gradient(
                    90deg,
                    #ff0000,
                    #ff4444,
                    #ff0000
                ) !important;
                margin: 20px 0 !important;
                border: none !important;
            }

            .info-table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 20px 0 !important;
                border: 1px solid #333333 !important;
            }

            .info-bg {
                background-color: #1a1a1a !important;
            }

            .info-row {
                border-bottom: 1px solid #333333 !important;
            }

            .info-row:last-child {
                border-bottom: none !important;
            }

            .info-label {
                font-weight: bold !important;
                color: #ffffff !important;
                width: 140px !important;
                padding: 12px 15px !important;
                vertical-align: top !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                font-size: 14px !important;
                background-color: #2a2a2a !important;
                border-right: 2px solid #ff0000 !important;
            }

            .nested-link {
                color: #ff0000 !important;
                text-decoration: none !important;
                border-bottom: 1px solid #ff0000 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                word-break: break-all !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
                display: inline-block !important;
            }
            
            .info-value {
                color: #e0e0e0 !important;
                padding: 12px 15px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                font-size: 14px !important;
                background-color: #1a1a1a !important;
                word-break: break-word !important;
                overflow-wrap: break-word !important;
                max-width: 0 !important;
            }
            
            a {
                color: #3366CC !important;
                word-break: break-all !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
            }
            
            @media only screen and (max-width: 600px) {
                .content-area {
                    padding: 20px 15px !important;
                    color: #e0e0e0 !important;
                }
            
                .info-label,
                .info-value {
                    display: block !important;
                    width: 100% !important;
                    padding: 8px 15px !important;
                    border-right: none !important;
                    font-size: 12px !important;
                }
            
                .info-label {
                    padding-bottom: 4px !important;
                    border-bottom: 1px solid #ff0000 !important;
                }
            
                .header-title {
                    font-size: 22px !important;
                    letter-spacing: 2px !important;
                }
            
                .header-image-container {
                    min-height: 100px !important;
                }
            
                .header-fallback-outlook {
                    padding: 25px 15px !important;
                }
            
                .year-badge {
                    font-size: 11px !important;
                }
            
                .title-separator {
                    margin: 0 5px !important;
                }
            
                .nested-link {
                    font-size: 12px !important;
                    word-break: break-all !important;
                }
            }

            .resume-table {
                margin-top: 10px !important;
            }

            .resume-button {
                background: linear-gradient(
                    135deg,
                    #ff0000,
                    #cc0000
                ) !important;
                color: #ffffff !important;
                padding: 12px 24px !important;
                text-decoration: none !important;
                display: inline-block !important;
                font-weight: bold !important;
                font-size: 14px !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                border: 2px solid #ff0000 !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
            }

            .footer-table {
                width: 100% !important;
                border-collapse: collapse !important;
            }

            .footer-area {
                background-color: #0d0d0d !important;
                padding: 20px !important;
                text-align: center !important;
                font-size: 14px !important;
                color: #888888 !important;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
                position: relative !important;
            }

            /* Footer top border */
            .footer-top-border {
                height: 2px !important;
                background-color: #ff0000 !important;
                position: relative !important;
            }

            .footer-top-border::before {
                content: "" !important;
                position: absolute !important;
                top: -2px !important;
                left: 0 !important;
                right: 0 !important;
                height: 2px !important;
                background: repeating-linear-gradient(
                    90deg,
                    #ff0000 0px,
                    #ff0000 10px,
                    transparent 10px,
                    transparent 20px
                ) !important;
            }

            .fallback-no-transform {
                padding: 40px 20px !important;
                text-align: center !important;
            }
        </style>
    </head>
    <body>
        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            class="main-bg"
        >
            <tr>
                <td align="center">
                    <table
                        class="email-container"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                    >

                        <!-- CONTENT -->
                        <tr>
                            <td>
                                <table
                                    class="content-table"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tr>
                                        <td class="content-area">
                                            ${htmlContent}
                                       </td>
                                   </tr>
                               </table>
                           </td>
                       </tr>

                       <tr>
                           <td class="footer-top-border"></td>
                       </tr>

                       <tr>
                           <td>
                               <table
                                   class="footer-table"
                                   cellpadding="0"
                                   cellspacing="0"
                                   border="0"
                               >
                                   <tr>
                                       <td class="footer-area">
                                           R|P 2025 • Reflections | Projections
                                       </td>
                                   </tr>
                               </table>
                           </td>
                       </tr>
                   </table>
               </td>
           </tr>
       </table>
   </body>
</html>`;
}

export function rpNoneTemplate(htmlContent: string) {
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
        ${htmlContent}
    </body>
</html>`;
}
