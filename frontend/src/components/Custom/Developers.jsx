import ConnectedSquares from "./ConnectedSquares";
import { Highlight } from "./HeroHighlight";
import BlinkingCursor from "./BlinkingCursor";

const Developers = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-10 mt-48 lg:mt-10">
      <div className="font-k2d font-bold text-4xl mt-8 mb-4 text-neutral-600">
        The Minds behind <Highlight className="font-k2d font-semibold">Arm&rsquo;mo<BlinkingCursor/></Highlight>
      </div>
      <div>
        <svg
          class="arrrow-down"
          width="12rem"
          height="7.5rem"
          viewBox="0 0 192 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M169.676 14.6267C169.676 14.6267 169.53 15.3733 169.236 16.8667C168.943 18.36 168.716 19.8 168.556 21.1867C168.41 22.5733 168.13 23.86 167.716 25.0467C167.303 26.22 166.823 27.2933 166.276 28.2667C165.73 29.24 165.17 30.2667 164.596 31.3467C164.01 32.4267 163.083 33.7533 161.816 35.3267C160.55 36.9 158.95 38.4333 157.016 39.9267C155.07 41.4333 152.836 43.1733 150.316 45.1467C147.796 47.12 144.623 49.2667 140.796 51.5867C136.97 53.9067 132.816 56.3 128.336 58.7667C123.843 61.2333 118.996 63.6067 113.796 65.8867C108.596 68.1533 103.07 70.36 97.2164 72.5067C91.3631 74.6533 85.4564 76.4733 79.4964 77.9667C73.5364 79.4733 67.8497 80.4867 62.4364 81.0067C57.0097 81.54 52.0364 81.6533 47.5164 81.3467C42.9831 81.04 39.0031 80.4933 35.5764 79.7067C32.1364 78.92 29.2431 77.66 26.8964 75.9267C24.5497 74.18 23.0297 72.0933 22.3364 69.6667C21.6297 67.24 22.0364 64.8733 23.5564 62.5667C25.0897 60.2467 27.5231 58.16 30.8564 56.3067C34.2031 54.4533 38.4764 53.1733 43.6764 52.4667C48.8764 51.76 54.4031 51.5267 60.2564 51.7667C66.1231 51.9933 71.6164 53.0867 76.7364 55.0467C81.8564 56.9933 86.4497 59.5733 90.5164 62.7867C94.5831 66.0133 98.0364 69.4267 100.876 73.0267C103.73 76.6267 105.95 80.2 107.536 83.7467C109.136 87.28 110.363 90.3133 111.216 92.8467C112.083 95.3933 113.043 97.8467 114.096 100.207C115.136 102.58 115.676 103.84 115.716 103.987C115.756 104.133 115.77 104.28 115.756 104.427C115.743 104.573 115.71 104.713 115.656 104.847C115.603 104.993 115.523 105.12 115.416 105.227C115.323 105.347 115.21 105.44 115.076 105.507C114.956 105.587 114.823 105.64 114.676 105.667C114.53 105.707 114.383 105.713 114.236 105.687C114.076 105.673 113.93 105.633 113.796 105.567C113.663 105.5 113.543 105.413 113.436 105.307C113.33 105.213 113.243 105.1 113.176 104.967C113.11 104.833 113.063 104.693 113.036 104.547C113.023 104.387 113.023 104.233 113.036 104.087C113.063 103.94 113.116 103.807 113.196 103.687C113.263 103.553 113.35 103.433 113.456 103.327C113.576 103.22 113.703 103.14 113.836 103.087C113.97 103.02 114.11 102.98 114.256 102.967C114.403 102.953 114.55 102.967 114.696 103.007C114.843 103.033 114.983 103.087 115.116 103.167C115.236 103.247 115.35 103.347 115.456 103.467C115.55 103.573 115.623 103.7 115.676 103.847C115.73 103.98 115.756 104.127 115.756 104.287C115.77 104.433 115.75 104.573 115.696 104.707C115.656 104.853 115.596 104.987 115.516 105.107C115.436 105.24 115.33 105.347 115.196 105.427C115.076 105.52 114.95 105.587 114.816 105.627C114.67 105.68 114.523 105.707 114.376 105.707C114.23 105.707 114.083 105.68 113.936 105.627C113.803 105.573 113.676 105.5 113.556 105.407C113.436 105.313 113.336 105.207 113.256 105.087C113.176 104.967 113.136 104.907 113.136 104.907C113.136 104.907 112.596 103.68 111.516 101.227C110.436 98.7733 109.483 96.32 108.656 93.8667C107.816 91.4 106.656 88.4933 105.176 85.1467C103.71 81.8 101.623 78.4 98.9164 74.9467C96.2231 71.4933 92.9631 68.2267 89.1364 65.1467C85.3097 62.0667 80.9764 59.5867 76.1364 57.7067C71.3097 55.8133 66.0497 54.7467 60.3564 54.5067C54.6764 54.28 49.3831 54.4667 44.4764 55.0667C39.5831 55.68 35.6164 56.7867 32.5764 58.3867C29.5364 59.9867 27.3097 61.68 25.8964 63.4667C24.4964 65.2533 24.0364 67.02 24.5164 68.7667C25.0097 70.5133 26.2297 72.1333 28.1764 73.6267C30.1364 75.12 32.7497 76.24 36.0164 76.9867C39.2831 77.7467 43.1031 78.28 47.4764 78.5867C51.8497 78.8933 56.6831 78.7933 61.9764 78.2867C67.2564 77.78 72.8231 76.7933 78.6764 75.3267C84.5431 73.86 90.3764 72.0667 96.1764 69.9467C101.99 67.8133 107.456 65.6267 112.576 63.3867C117.696 61.16 122.483 58.82 126.936 56.3667C131.403 53.9267 135.503 51.5733 139.236 49.3067C142.97 47.0533 146.096 44.9333 148.616 42.9467C151.15 40.9733 153.31 39.3067 155.096 37.9467C156.883 36.6 158.363 35.2133 159.536 33.7867C160.696 32.36 161.57 31.1 162.156 30.0067C162.743 28.9 163.276 27.9333 163.756 27.1067C164.236 26.28 164.663 25.38 165.036 24.4067C165.396 23.42 165.663 22.2 165.836 20.7467C166.01 19.2933 166.243 17.82 166.536 16.3267C166.843 14.8467 167.01 14.0533 167.036 13.9467C167.076 13.84 167.123 13.74 167.176 13.6467C167.243 13.5533 167.316 13.4667 167.396 13.3867C167.476 13.3067 167.563 13.24 167.656 13.1867C167.75 13.1333 167.85 13.0867 167.956 13.0467C168.063 13.02 168.17 13.0067 168.276 13.0067C168.383 12.9933 168.49 13 168.596 13.0267C168.703 13.0533 168.81 13.0867 168.916 13.1267C169.01 13.18 169.103 13.24 169.196 13.3067C169.276 13.3733 169.35 13.4533 169.416 13.5467C169.483 13.64 169.543 13.7333 169.596 13.8267C169.636 13.9333 169.663 14.04 169.676 14.1467C169.703 14.2533 169.71 14.36 169.696 14.4667C169.683 14.5733 169.676 14.6267 169.676 14.6267Z"
            fill="#4B4B4B"
          ></path>
          <path
            d="M101.035 95.1867C101.035 95.1867 101.782 95.6267 103.275 96.5067C104.769 97.4001 106.089 98.2534 107.235 99.0667C108.395 99.8801 109.442 100.667 110.375 101.427C111.322 102.173 112.155 102.787 112.875 103.267C113.609 103.747 114.155 103.567 114.515 102.727C114.889 101.887 115.202 100.653 115.455 99.0267C115.722 97.4134 116.089 95.6667 116.555 93.7867C117.022 91.8934 117.549 90.2467 118.135 88.8467C118.709 87.4601 119.369 85.6334 120.115 83.3667C120.875 81.1001 121.289 79.9001 121.355 79.7667C121.435 79.6334 121.529 79.5134 121.635 79.4067C121.742 79.3134 121.862 79.2334 121.995 79.1667C122.142 79.1134 122.289 79.0801 122.435 79.0667C122.582 79.0534 122.729 79.0667 122.875 79.1067C123.022 79.1334 123.155 79.1867 123.275 79.2667C123.409 79.3467 123.522 79.4467 123.615 79.5667C123.709 79.6867 123.782 79.8134 123.835 79.9467C123.889 80.0934 123.915 80.2401 123.915 80.3867C123.929 80.5334 123.909 80.6801 123.855 80.8267C123.815 80.9734 123.755 81.1067 123.675 81.2267C123.582 81.3467 123.475 81.4534 123.355 81.5467C123.235 81.6267 123.102 81.6867 122.955 81.7267C122.822 81.7801 122.675 81.8067 122.515 81.8067C122.369 81.7934 122.229 81.7601 122.095 81.7067C121.949 81.6667 121.815 81.6001 121.695 81.5067C121.575 81.4134 121.475 81.3001 121.395 81.1667C121.315 81.0467 121.262 80.9134 121.235 80.7667C121.195 80.6201 121.182 80.4734 121.195 80.3267C121.195 80.1801 121.229 80.0334 121.295 79.8867C121.349 79.7534 121.429 79.6334 121.535 79.5267C121.629 79.4067 121.742 79.3134 121.875 79.2467C122.009 79.1667 122.149 79.1134 122.295 79.0867C122.442 79.0601 122.589 79.0534 122.735 79.0667C122.882 79.0934 123.022 79.1401 123.155 79.2067C123.289 79.2734 123.409 79.3601 123.515 79.4667C123.622 79.5601 123.709 79.6734 123.775 79.8067C123.842 79.9401 123.889 80.0867 123.915 80.2467C123.929 80.3934 123.922 80.5401 123.895 80.6867C123.869 80.8334 123.855 80.9067 123.855 80.9067C123.855 80.9067 123.469 82.0601 122.695 84.3667C121.935 86.6734 121.289 88.4601 120.755 89.7267C120.222 90.9801 119.722 92.5201 119.255 94.3467C118.802 96.1734 118.402 98.0267 118.055 99.9067C117.709 101.787 116.835 103.427 115.435 104.827C114.022 106.213 112.775 106.54 111.695 105.807C110.602 105.073 109.609 104.347 108.715 103.627C107.822 102.907 106.829 102.16 105.735 101.387C104.642 100.613 103.349 99.7801 101.855 98.8867C100.375 97.9934 99.5888 97.5134 99.4954 97.4467C99.4154 97.3801 99.3354 97.3001 99.2554 97.2067C99.1887 97.1267 99.1354 97.0334 99.0954 96.9267C99.0421 96.8201 99.0087 96.7134 98.9954 96.6067C98.9687 96.5001 98.9621 96.4001 98.9754 96.3067C98.9754 96.1867 98.9954 96.0734 99.0354 95.9667C99.0621 95.8601 99.1088 95.7601 99.1754 95.6667C99.2288 95.5734 99.2954 95.4867 99.3754 95.4067C99.4554 95.3267 99.5421 95.2601 99.6354 95.2067C99.7287 95.1401 99.8288 95.0934 99.9354 95.0667C100.042 95.0267 100.149 95.0067 100.255 95.0067C100.349 94.9934 100.455 95.0001 100.575 95.0267C100.682 95.0401 100.789 95.0734 100.895 95.1267C100.989 95.1667 101.035 95.1867 101.035 95.1867Z"
            fill="#4B4B4B"
          ></path>
        </svg>
      </div>
      <ConnectedSquares />
    </div>
  );
};

export default Developers;
