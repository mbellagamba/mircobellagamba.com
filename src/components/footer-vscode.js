import React from "react"
import styles from "./footer-vscode.module.css"

export default function () {
  return (
    <div className={styles.row}>
      <div className={styles.item}>
        <svg
          style={{ width: "22px", height: "22px", margin: "0.25rem" }}
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M21.0067 8.22168C21.0102 7.52792 20.8205 6.84689 20.4589 6.25485C20.0971 5.66281 19.5778 5.18315 18.959 4.86957C18.3401 4.556 17.6461 4.42091 16.9548 4.47941C16.2635 4.53793 15.6022 4.78773 15.0448 5.20085C14.4875 5.61397 14.0561 6.17409 13.7991 6.8185C13.5421 7.4629 13.4695 8.16613 13.5895 8.84944C13.7096 9.53274 14.0174 10.1692 14.4787 10.6874C14.94 11.2056 15.5365 11.5852 16.2012 11.7836C15.9558 12.2824 15.576 12.703 15.1047 12.9979C14.6334 13.2929 14.0892 13.4505 13.5331 13.4532H10.5437C9.43702 13.4571 8.37138 13.8727 7.55427 14.6191V7.39809C8.46159 7.21288 9.26783 6.69737 9.81668 5.95151C10.3655 5.20565 10.6178 4.28256 10.5248 3.36121C10.4317 2.43987 9.99985 1.5859 9.31292 0.964873C8.62599 0.343845 7.73295 0 6.80691 0C5.88087 0 4.98783 0.343845 4.3009 0.964873C3.61397 1.5859 3.18211 2.43987 3.08904 3.36121C2.99596 4.28256 3.24831 5.20565 3.79715 5.95151C4.34599 6.69737 5.15223 7.21288 6.05955 7.39809V16.5159C5.15393 16.6891 4.34299 17.1877 3.77969 17.9176C3.21639 18.6476 2.93968 19.5585 3.00173 20.4785C3.06379 21.3984 3.46033 22.2639 4.11656 22.9115C4.77279 23.5592 5.64335 23.9444 6.56403 23.9944C7.48472 24.0445 8.39187 23.7558 9.1144 23.183C9.83693 22.6102 10.3249 21.7928 10.4862 20.885C10.6475 19.9771 10.4712 19.0417 9.99023 18.255C9.50932 17.4683 8.75717 16.8848 7.87564 16.6145C8.12152 16.1162 8.50142 15.6963 8.97272 15.4019C9.44401 15.1074 9.98803 14.9503 10.5437 14.9479H13.5331C14.4658 14.9436 15.3739 14.6486 16.1311 14.1039C16.8882 13.5592 17.4566 12.792 17.7572 11.9091C18.6531 11.7914 19.476 11.3528 20.0735 10.6748C20.671 9.9968 21.0025 9.12533 21.0067 8.22168ZM4.56483 3.73752C4.56483 3.29408 4.69633 2.8606 4.94269 2.4919C5.18906 2.12319 5.53922 1.83581 5.9489 1.66611C6.3586 1.49642 6.8094 1.45202 7.24432 1.53854C7.67924 1.62504 8.07874 1.83857 8.3923 2.15214C8.70586 2.4657 8.9194 2.8652 9.00591 3.30012C9.09241 3.73504 9.04802 4.18585 8.87832 4.59553C8.70862 5.00521 8.42125 5.35539 8.05254 5.60175C7.68383 5.84811 7.25035 5.9796 6.80691 5.9796C6.21227 5.9796 5.642 5.74339 5.22152 5.32291C4.80105 4.90245 4.56483 4.33216 4.56483 3.73752ZM9.04899 20.1794C9.04899 20.6229 8.91749 21.0563 8.67113 21.425C8.42476 21.7937 8.0746 22.0811 7.66492 22.2508C7.25523 22.4205 6.80442 22.4649 6.36951 22.3784C5.93458 22.292 5.53509 22.0784 5.22152 21.7648C4.90796 21.4512 4.69443 21.0517 4.60791 20.6169C4.52141 20.1819 4.5658 19.7311 4.7355 19.3214C4.9052 18.9117 5.19258 18.5615 5.56128 18.3152C5.92999 18.0689 6.36347 17.9373 6.80691 17.9373C7.40155 17.9373 7.97183 18.1736 8.3923 18.594C8.81277 19.0145 9.04899 19.5848 9.04899 20.1794ZM17.2699 10.4638C16.8265 10.4638 16.393 10.3322 16.0243 10.0859C15.6556 9.83954 15.3683 9.48937 15.1986 9.07969C15.0289 8.67 14.9844 8.2192 15.0709 7.78427C15.1574 7.34935 15.3709 6.94985 15.6845 6.63629C15.9981 6.32273 16.3976 6.10919 16.8325 6.02268C17.2674 5.93617 17.7183 5.98058 18.1279 6.15027C18.5377 6.31997 18.8878 6.60734 19.1341 6.97605C19.3805 7.34476 19.512 7.77823 19.512 8.22168C19.512 8.81632 19.2757 9.3866 18.8553 9.80706C18.4348 10.2275 17.8645 10.4638 17.2699 10.4638Z"
          />
        </svg>
        <small>© {new Date().getFullYear()} Mirco Bellagamba</small>
        <div className={styles.sync}>
          <svg viewBox="0 0 16 16">
            <path
              d="M2.00583 8.26691L0.78 9.50003L0 8.73003L2.09 6.66003L2.85 6.67003L4.94 8.79003L4.18 9.55003L3.01348 8.36995C3.2028 10.9586 5.363 13 8 13C9.91062 13 11.571 11.9283 12.4127 10.3533L13.226 10.9499C12.1959 12.7709 10.2415 14 8 14C4.77573 14 2.14547 11.4568 2.00583 8.26691ZM12.9961 7.80051L11.76 6.55005L11 7.31005L13.09 9.42005L13.85 9.43005L15.94 7.36005L15.19 6.60005L13.996 7.78004C13.8803 4.56823 11.2401 2 8 2C5.83727 2 3.94179 3.14427 2.88597 4.86043L3.69563 5.45436C4.56647 3.98506 6.1682 3 8 3C10.6946 3 12.8914 5.13157 12.9961 7.80051Z"
              fill="white"
            />
          </svg>
          <small>Initializing JS/TS language features</small>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.info}>
          <small>Spaces: 2</small>
          <small>UTF8</small>
          <small>LF</small>
          <small>JavaScript</small>
        </div>
        <a
          href="https://twitter.com/mircoBellaG"
          className={styles.link}
          aria-label="twitter"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="white"
              d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
            />
          </svg>
        </a>
        <a
          href="https://github.com/mbellagamba"
          className={styles.link}
          aria-label="github"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </a>
        <a
          href="https://linkedin.com/mirco.bellagamba"
          className={styles.link}
          aria-label="linkedin"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="white"
              d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
