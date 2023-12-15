import { FileMetadata, Rating } from '@/app/types';

type RottenTomatoesBadgeProps = {
	criticsRating: Rating['criticsRating'];
};

export function RottenTomatoesBadge({ criticsRating }: RottenTomatoesBadgeProps) {
	switch (criticsRating) {
		case 'Rotten':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 80 80"
					version="1.1"
					className="h-[14px]"
				>
					<title>Icons/Tomatometer &amp; AS/rotten</title>
					<desc>Created with Sketch.</desc>
					<defs>
						<polygon
							id="path-1"
							points="0 0.161950465 79.7417075 0.161950465 79.7417075 77.522807 0 77.522807"
						/>
					</defs>
					<g
						id="Icons/Tomatometer-&amp;-AS/rotten"
						stroke="none"
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
					>
						<g id="Group-5">
							<rect
								id="Rectangle-Copy"
								fill="#000000"
								opacity="0"
								x="0"
								y="0"
								width="80"
								height="80"
							/>
							<g id="RT_Rotten_Splat_RGB-(1)" transform="translate(0.000000, 1.228070)">
								<g id="Group-3">
									<mask id="mask-2" fill="white">
										<use xlinkHref="#path-1" />
									</mask>
									<g id="Clip-2" />
									<path
										d="M71.4638596,70.225614 C56.3459649,71.0192982 53.2568421,53.7203509 47.325614,53.8435088 C44.7982456,53.8964912 42.8063158,56.5389474 43.6810526,59.6185965 C44.1621053,61.3115789 45.4964912,63.794386 46.337193,65.3350877 C49.302807,70.7719298 44.9185965,76.9245614 39.7880702,77.4449123 C31.2621053,78.3098246 27.705614,73.3638596 27.925614,68.3007018 C28.1729825,62.6168421 32.9922807,56.8091228 28.0494737,54.3378947 C22.8694737,51.7480702 18.6585965,61.8754386 13.7017544,64.1357895 C9.2154386,66.1817544 2.9877193,64.5954386 0.773684211,59.6136842 C-0.781403509,56.1129825 -0.498596491,49.3722807 6.42526316,46.8003509 C10.7501754,45.1940351 20.3880702,48.9010526 20.8824561,44.205614 C21.4522807,38.7929825 10.7575439,38.3364912 7.53754386,37.0385965 C1.84,34.7424561 -1.52280702,29.8291228 1.11192982,24.5582456 C3.08877193,20.6045614 8.90526316,18.9957895 13.3449123,20.7277193 C18.6635088,22.8024561 19.517193,28.3189474 22.2421053,30.6129825 C24.5894737,32.5901754 27.8021053,32.8375439 29.9031579,31.4782456 C31.4526316,30.4754386 31.9684211,28.2729825 31.3838596,26.2610526 C30.6084211,23.5901754 28.5505263,21.9235088 26.542807,20.2905263 C22.9698246,17.3859649 17.925614,14.8884211 20.9768421,6.96035088 C23.4778947,0.463157895 30.8133333,0.229122807 30.8133333,0.229122807 C33.7277193,-0.0985964912 36.3375439,0.781403509 38.4642105,2.68140351 C41.3073684,5.22140351 41.8610526,8.61649123 41.3852632,12.2385965 C40.9505263,15.5449123 39.7803509,18.4407018 39.1701754,21.7164912 C38.4621053,25.5196491 40.4947368,29.3519298 44.3603509,29.5010526 C49.4449123,29.6975439 50.9694737,25.7894737 51.5915789,23.3122807 C52.5024561,19.6877193 53.6978947,16.322807 57.0617544,14.2035088 C61.8894737,11.1617544 68.5954386,11.8284211 71.7066667,17.674386 C74.1677193,22.3 73.3775439,28.6677193 69.6024561,32.1449123 C67.9087719,33.7045614 65.8722807,34.254386 63.6694737,34.2698246 C60.5105263,34.2922807 57.3529825,34.2147368 54.4207018,35.6929825 C52.4245614,36.6989474 51.5547368,38.3382456 51.5550877,40.5354386 C51.5550877,42.6768421 52.6698246,44.0754386 54.4761404,44.985614 C57.8782456,46.7003509 61.6336842,47.0508772 65.3087719,47.694386 C70.6382456,48.6277193 75.3242105,50.5049123 78.3326316,55.4505263 C78.3596491,55.4940351 78.3859649,55.5378947 78.4115789,55.5821053 C81.8666667,61.4375439 78.2533333,69.8687719 71.4638596,70.225614"
										id="Fill-1"
										fill="#0AC855"
										mask="url(#mask-2)"
									/>
								</g>
							</g>
						</g>
					</g>
				</svg>
			);
		case 'Fresh':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 80 80"
					version="1.1"
					className="h-[14px]"
				>
					<title>Icons/Tomatometer &amp; AS/fresh</title>
					<desc>Created with Sketch.</desc>
					<defs>
						<polygon
							id="path-1"
							points="0.000109100102 0.246970954 77.0827837 0.246970954 77.0827837 63.7145228 0.000109100102 63.7145228"
						/>
					</defs>
					<g
						id="Icons/Tomatometer-&amp;-AS/fresh"
						stroke="none"
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
					>
						<g id="Group">
							<rect
								id="Rectangle-Copy-2"
								fill="#000000"
								opacity="0"
								x="0"
								y="0"
								width="80"
								height="80"
							/>
							<g id="RT_Fresh_Tomato_RGB-(1)" transform="translate(1.327801, 0.000000)">
								<g id="Group-3" transform="translate(0.000000, 16.265560)">
									<mask id="mask-2" fill="white">
										<use xlinkHref="#path-1" />
									</mask>
									<g id="Clip-2" />
									<path
										d="M77.0137759,27.0426556 C76.2423237,14.6741909 69.9521992,5.42041494 60.4876349,0.246970954 C60.5414108,0.548381743 60.273195,0.925145228 59.9678008,0.791701245 C53.7772614,-1.91634855 43.2753527,6.84780083 35.9365975,2.25825726 C35.9917012,3.90539419 35.6700415,11.940249 24.3515353,12.4063071 C24.0843154,12.4172614 23.9372614,12.1443983 24.1062241,11.9512033 C25.619917,10.2247303 27.1482158,5.85360996 24.9507054,3.5233195 C20.2446473,7.74041494 17.5117012,9.32746888 8.48829876,7.23319502 C2.71103734,13.2740249 -0.562655602,21.5419087 0.08,31.8413278 C1.39120332,52.86639 21.0848133,64.8846473 40.9165145,63.6471369 C60.746888,62.4106224 78.3253112,48.0677178 77.0137759,27.0426556"
										id="Fill-1"
										fill="#FA320A"
										mask="url(#mask-2)"
									/>
								</g>
								<path
									d="M40.8717012,11.4648963 C44.946722,10.49361 56.6678838,11.3702905 60.4232365,16.3518672 C60.6486307,16.6506224 60.3312863,17.2159336 59.9678008,17.0572614 C53.7772614,14.3492116 43.2753527,23.113361 35.9365975,18.5238174 C35.9917012,20.1709544 35.6700415,28.2058091 24.3515353,28.6718672 C24.0843154,28.6828216 23.9372614,28.4099585 24.1062241,28.2167635 C25.619917,26.4902905 27.1478838,22.1191701 24.9507054,19.7888797 C19.8243983,24.3827386 17.0453112,25.8589212 5.91900415,22.8514523 C5.55485477,22.753195 5.67900415,22.1679668 6.06639004,22.020249 C8.16929461,21.2165975 12.933444,17.6965975 17.4406639,16.1450622 C18.2987552,15.8499585 19.1541909,15.6209129 19.9890456,15.4878008 C15.02639,15.0443154 12.7893776,14.3541909 9.63286307,14.8302075 C9.28697095,14.8823237 9.05195021,14.479668 9.26639004,14.2034855 C13.5193361,8.7253112 21.3540249,7.07087137 26.1878838,9.98107884 C23.2082988,6.28912863 20.8743568,3.34473029 20.8743568,3.34473029 L26.4046473,0.203485477 C26.4046473,0.203485477 28.6894606,5.30821577 30.3518672,9.02340249 C34.4657261,2.94506224 42.119834,2.38406639 45.3536929,6.69676349 C45.5455602,6.95302905 45.3450622,7.31751037 45.0247303,7.30987552 C42.3926971,7.24580913 40.9434025,9.63983402 40.833527,11.4605809 L40.8717012,11.4648963"
									id="Fill-4"
									fill="#00912D"
								/>
							</g>
						</g>
					</g>
				</svg>
			);
		case 'Certified Fresh':
			//https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/certified_fresh.75211285dbb.svg
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 80 80"
					version="1.1"
					className="h-[14px]"
				>
					<title>Icons/Tomatometer &amp; AS/certified_fresh_notext</title>
					<desc>Created with Sketch.</desc>
					<defs>
						<polygon
							id="path-1"
							points="0.137142857 0.921142857 75.0534777 0.921142857 75.0534777 79.8628571 0.137142857 79.8628571"
						/>
						<polygon
							id="path-3"
							points="0.137142857 0.016 67.4935952 0.016 67.4935952 59.2914286 0.137142857 59.2914286"
						/>
					</defs>
					<g
						id="Icons/Tomatometer-&amp;-AS/certified_fresh_notext"
						stroke="none"
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
					>
						<g id="Group-2">
							<rect
								id="Rectangle-Copy-3"
								fill="#000000"
								opacity="0"
								x="0"
								y="0"
								width="80"
								height="80"
							/>
							<g id="RT_CertifiedFreshIcon_NOTEXT_RGB" transform="translate(2.285714, 0.000000)">
								<line
									x1="41.12"
									y1="23.0194286"
									x2="40.7588571"
									y2="22.9942857"
									id="Fill-1"
									fill="#FA3108"
								/>
								<path
									d="M42.1942857,18.8022857 C44.3794286,18.608 49.1565714,18.7177143 51.4902857,21.0057143 C51.6297143,21.1451429 51.5085714,21.4605714 51.3097143,21.408 C47.8902857,20.4868571 42.5577143,25.0217143 39.1017143,22.0891429 C39.008,22.9485714 38.2331429,27.0857143 32.3314286,26.4731429 C32.192,26.4594286 32.1371429,26.304 32.24,26.2171429 C33.1542857,25.44 34.2765714,23.2891429 33.3142857,21.9154286 C30.3108571,23.9085714 28.7565714,23.9954286 23.2182857,21.5954286 C23.0377143,21.5177143 23.1451429,21.2228571 23.3577143,21.1748571 C24.5074286,20.9165714 27.2434286,19.9222857 29.696,19.4582857 C30.1645714,19.3691429 30.624,19.3165714 31.0674286,19.312 C28.528,18.7062857 27.4217143,18.1805714 25.7485714,18.1874286 C25.5657143,18.1897143 25.4742857,17.9611429 25.6068571,17.8354286 C28.224,15.3188571 32.9691429,15.1885714 35.2548571,17.0628571 L33.2068571,12.7862857 L35.696,12.4114286 C35.696,12.4114286 36.3451429,14.6925714 36.9257143,16.7428571 C39.5177143,13.904 43.5268571,14.192 44.8777143,16.672 C44.9577143,16.8182857 44.8251429,16.992 44.6605714,16.9622857 C43.3005714,16.7314286 42.3702857,17.8628571 42.1737143,18.7977143 L42.1942857,18.8022857"
									id="Fill-2"
									fill="#00912D"
								/>
								<g id="Group-7">
									<mask id="mask-2" fill="white">
										<use xlinkHref="#path-1" />
									</mask>
									<g id="Clip-4" />
									<path
										d="M13.0491429,59.1817143 C9.90628571,55.3554286 7.86971429,50.576 7.51771429,44.9622857 C6.912,35.2342857 10.2354286,26.0845714 23.1794286,21.4834286 C23.1908571,21.5245714 23.1725714,21.5748571 23.2182857,21.5954286 C23.0377143,21.5177143 23.1451429,21.2228571 23.3577143,21.1748571 C24.5074286,20.9165714 27.2434286,19.92 29.696,19.4582857 C30.1645714,19.3691429 30.624,19.3165714 31.0674286,19.3097143 C28.528,18.7062857 27.4217143,18.1805714 25.7485714,18.1874286 C25.5657143,18.1897143 25.4742857,17.9611429 25.6068571,17.8331429 C28.224,15.3165714 32.9691429,15.1885714 35.2548571,17.0628571 L33.2068571,12.784 L35.696,12.4114286 C35.696,12.4114286 36.3451429,14.6902857 36.9257143,16.7428571 C39.5177143,13.904 43.5268571,14.192 44.8777143,16.672 C44.9577143,16.8182857 44.8251429,16.992 44.6605714,16.9622857 C43.3005714,16.7314286 42.3702857,17.8628571 42.1737143,18.7977143 L42.1942857,18.8022857 C44.3794286,18.608 49.1565714,18.7177143 51.4902857,21.0057143 C51.328,20.8502857 51.1337143,20.7245714 50.9508571,20.5874286 C60.2765714,23.504 66.7474286,30.1531429 67.44,41.2251429 C67.8811429,48.2948571 65.5702857,54.3885714 61.568,59.1154286 C62.784,59.2891429 63.9931429,59.4925714 65.2045714,59.6937143 C70.304,53.4537143 73.2502857,45.5428571 73.2502857,37.056 C73.2502857,17.7165714 57.5337143,2.56685714 37.472,2.56685714 C17.4102857,2.56685714 1.69371429,17.7165714 1.69371429,37.056 C1.69371429,45.5565714 4.64,53.472 9.744,59.7097143 C10.8434286,59.5268571 11.9451429,59.3462857 13.0491429,59.1817143"
										id="Fill-3"
										fill="#FFD700"
										mask="url(#mask-2)"
									/>
									<path
										d="M9.744,59.7097143 C4.64,53.472 1.69371429,45.5565714 1.69371429,37.056 C1.69371429,17.7165714 17.4102857,2.56685714 37.472,2.56685714 C57.5337143,2.56685714 73.2502857,17.7165714 73.2502857,37.056 C73.2502857,45.5428571 70.304,53.4537143 65.2045714,59.6937143 C65.8125714,59.7942857 66.4205714,59.8742857 67.0285714,59.984 C71.9497143,53.6457143 74.8937143,45.6982857 74.8937143,37.056 C74.8937143,16.3862857 58.1394286,0.921142857 37.472,0.921142857 C16.8022857,0.921142857 0.048,16.3862857 0.048,37.056 C0.048,45.7074286 2.99885714,53.6594286 7.92914286,59.9977143 C8.53257143,59.8902857 9.13828571,59.8102857 9.744,59.7097143"
										id="Fill-5"
										fill="#FA6E0F"
										mask="url(#mask-2)"
									/>
									<path
										d="M58.2857143,74.9394286 C62.3748571,75.1954286 65.7874286,77.2137143 67.8468571,79.9474286 C67.9131429,80.0182857 68.0114286,80.016 68.0411429,79.9382857 C68.7451429,77.0971429 68.9394286,74.0662857 68.5851429,71.0125714 C68.5874286,70.9805714 68.6125714,70.9577143 68.6537143,70.9485714 C70.576,70.3428571 72.7017143,70.0137143 74.9645714,70.0457143 C75.0857143,70.0594286 75.0834286,69.9405714 74.9554286,69.8194286 C72.5577143,67.4994286 69.6297143,65.6914286 66.416,64.5417143 C65.3051429,67.68 64.2217143,70.816 63.1565714,73.9634286 C63.136,74.0228571 63.0514286,74.0594286 62.9645714,74.0434286 L58.2857143,74.9394286"
										id="Fill-6"
										fill="#0AC855"
										mask="url(#mask-2)"
									/>
								</g>
								<path
									d="M62.9645714,74.0434286 L58.2857143,74.9394286 C58.2857143,74.9394286 58.3451429,74.512 58.528,73.3325714 C60.9417143,73.6754286 62.9645714,74.0434286 62.9645714,74.0434286"
									id="Fill-8"
									fill="#0B4902"
								/>
								<g id="Group-12" transform="translate(0.000000, 20.571429)">
									<mask id="mask-4" fill="white">
										<use xlinkHref="#path-3" />
									</mask>
									<g id="Clip-10" />
									<path
										d="M13.0765714,38.6057143 C29.1177143,36.2605714 45.5222857,36.2354286 61.568,38.544 C65.5702857,33.8171429 67.8811429,27.7234286 67.44,20.6537143 C66.7474286,9.58171429 60.2765714,2.93257143 50.9508571,0.016 C51.1337143,0.153142857 51.328,0.278857143 51.4902857,0.434285714 C51.6297143,0.573714286 51.5085714,0.889142857 51.3097143,0.836571429 C47.8902857,-0.0845714286 42.5577143,4.45028571 39.1017143,1.51771429 C39.008,2.37485714 38.2331429,6.51428571 32.3314286,5.90171429 C32.192,5.888 32.1371429,5.73257143 32.24,5.64571429 C33.1542857,4.86857143 34.2765714,2.71542857 33.3142857,1.344 C30.3108571,3.33714286 28.7565714,3.424 23.2182857,1.024 C23.1725714,1.00342857 23.1908571,0.953142857 23.1794286,0.912 C10.2354286,5.51314286 6.912,14.6628571 7.51771429,24.3908571 C7.86971429,30.0091429 9.93142857,34.7748571 13.0765714,38.6057143"
										id="Fill-9"
										fill="#FA3200"
										mask="url(#mask-4)"
									/>
									<path
										d="M12.0868571,53.472 C12,53.488 11.9154286,53.4514286 11.8948571,53.392 C10.8274286,50.2445714 9.73485714,47.0971429 8.62171429,43.9611429 C5.41028571,45.1108571 2.49371429,46.9302857 0.0982857143,49.248 C-0.0297142857,49.3691429 -0.032,49.488 0.0891428571,49.4742857 C2.352,49.4422857 4.47771429,49.7714286 6.4,50.3771429 C6.44114286,50.3862857 6.46628571,50.4091429 6.46857143,50.4411429 C6.11428571,53.4948571 6.30857143,56.5257143 7.01257143,59.3668571 C7.04228571,59.4445714 7.14057143,59.4468571 7.20685714,59.376 C9.26628571,56.6422857 12.6742857,54.624 16.7657143,54.368 L12.0868571,53.472"
										id="Fill-11"
										fill="#0AC855"
										mask="url(#mask-4)"
									/>
								</g>
								<path
									d="M62.9645714,74.0434286 C46.192,71.104 28.8571429,71.104 12.0868571,74.0434286 C12,74.0594286 11.9154286,74.0228571 11.8948571,73.9634286 C10.3428571,69.3851429 8.74285714,64.8182857 7.09257143,60.2628571 C7.06971429,60.1988571 7.14057143,60.1257143 7.248,60.1074286 C27.1885714,56.464 47.8605714,56.464 67.8034286,60.1074286 C67.9108571,60.1257143 67.9817143,60.1988571 67.9565714,60.2628571 C66.3085714,64.8182857 64.7085714,69.3851429 63.1565714,73.9634286 C63.136,74.0228571 63.0514286,74.0594286 62.9645714,74.0434286"
									id="Fill-13"
									fill="#00912D"
								/>
								<path
									d="M12.0868571,74.0434286 L16.7657143,74.9394286 C16.7657143,74.9394286 16.704,74.512 16.5211429,73.3325714 C14.1074286,73.6754286 12.0868571,74.0434286 12.0868571,74.0434286"
									id="Fill-14"
									fill="#0B4902"
								/>
							</g>
						</g>
					</g>
				</svg>
			);
		default:
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 80 81"
					version="1.1"
					className="h-[14px]"
				>
					<title>Icons/Tomatometer &amp; AS/No Tomatometer</title>
					<desc>Created with Sketch.</desc>
					<defs>
						<polygon
							id="path-1"
							points="0.000109100102 0.246970954 77.0827837 0.246970954 77.0827837 63.7145228 0.000109100102 63.7145228"
						/>
					</defs>
					<g
						id="Icons/Tomatometer-&amp;-AS/No-Tomatometer"
						stroke="none"
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
					>
						<g id="Icons/Tomatometer-&amp;-AS/fresh-Copy">
							<g id="Group">
								<rect
									id="Rectangle-Copy-2"
									fill="#000000"
									opacity="0"
									x="0"
									y="0"
									width="80"
									height="80"
								/>
								<g id="RT_Fresh_Tomato_RGB-(1)" transform="translate(1.327801, 0.000000)">
									<g id="Group-3" transform="translate(0.000000, 16.265560)">
										<mask id="mask-2" fill="white">
											<use xlinkHref="#path-1" />
										</mask>
										<g id="Clip-2" />
										<path
											d="M77.0137759,27.0426556 C76.2423237,14.6741909 69.9521992,5.42041494 60.4876349,0.246970954 C60.5414108,0.548381743 60.273195,0.925145228 59.9678008,0.791701245 C53.7772614,-1.91634855 43.2753527,6.84780083 35.9365975,2.25825726 C35.9917012,3.90539419 35.6700415,11.940249 24.3515353,12.4063071 C24.0843154,12.4172614 23.9372614,12.1443983 24.1062241,11.9512033 C25.619917,10.2247303 27.1482158,5.85360996 24.9507054,3.5233195 C20.2446473,7.74041494 17.5117012,9.32746888 8.48829876,7.23319502 C2.71103734,13.2740249 -0.562655602,21.5419087 0.08,31.8413278 C1.39120332,52.86639 21.0848133,64.8846473 40.9165145,63.6471369 C60.746888,62.4106224 78.3253112,48.0677178 77.0137759,27.0426556"
											id="Fill-1"
											fill="#DEDEDF"
											mask="url(#mask-2)"
										/>
									</g>
									<path
										d="M40.8717012,11.4648963 C44.946722,10.49361 56.6678838,11.3702905 60.4232365,16.3518672 C60.6486307,16.6506224 60.3312863,17.2159336 59.9678008,17.0572614 C53.7772614,14.3492116 43.2753527,23.113361 35.9365975,18.5238174 C35.9917012,20.1709544 35.6700415,28.2058091 24.3515353,28.6718672 C24.0843154,28.6828216 23.9372614,28.4099585 24.1062241,28.2167635 C25.619917,26.4902905 27.1478838,22.1191701 24.9507054,19.7888797 C19.8243983,24.3827386 17.0453112,25.8589212 5.91900415,22.8514523 C5.55485477,22.753195 5.67900415,22.1679668 6.06639004,22.020249 C8.16929461,21.2165975 12.933444,17.6965975 17.4406639,16.1450622 C18.2987552,15.8499585 19.1541909,15.6209129 19.9890456,15.4878008 C15.02639,15.0443154 12.7893776,14.3541909 9.63286307,14.8302075 C9.28697095,14.8823237 9.05195021,14.479668 9.26639004,14.2034855 C13.5193361,8.7253112 21.3540249,7.07087137 26.1878838,9.98107884 C23.2082988,6.28912863 20.8743568,3.34473029 20.8743568,3.34473029 L26.4046473,0.203485477 C26.4046473,0.203485477 28.6894606,5.30821577 30.3518672,9.02340249 C34.4657261,2.94506224 42.119834,2.38406639 45.3536929,6.69676349 C45.5455602,6.95302905 45.3450622,7.31751037 45.0247303,7.30987552 C42.3926971,7.24580913 40.9434025,9.63983402 40.833527,11.4605809 L40.8717012,11.4648963"
										id="Fill-4"
										fill="#BCBDBE"
									/>
								</g>
							</g>
						</g>
					</g>
				</svg>
			);
	}
}

type ContentRatingBadgeProps = {
	contentRating: FileMetadata['contentRating'];
};

export function ContentRatingBadge({ contentRating }: ContentRatingBadgeProps) {
	switch (contentRating) {
		case 'G':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" className="h-[14px]">
					<g fill="none" fillRule="evenodd">
						<path
							d="m10.385 8.614c0-.715.295-.38 2.827-.38 1.87 0 2.649-.254 2.648.349s-1.194-.01-1.422.567.072 2.046-.449 2.394c-1.300912.4412394-2.6591866.6905259-4.032.74-4.932 0-5.138-1.084-5.134-4.578.005-4.494.852-4.972 5.786-4.972 1.108 0 3.369.048 3.484.617.2459833.78657525.2695183 1.62587626.068 2.425-.219.555-1.907.208-1.907.208-.721-.692-.16-1.929-2.254-1.929-2.623 0-2.4 1.517-2.4 3.676 0 1.327-.206 3.224 2.305 3.224.969 0 1.67-.111 1.671-1.345.004-1.196-1.192-.14-1.191-.996z"
							fill="currentColor"
						/>
						<rect height="14" rx="2.759" stroke="#3c3c43" width="19" x=".5" y=".5" />
					</g>
				</svg>
			);
		case 'PG':
			return (
				<svg viewBox="0 0 31 15" xmlns="http://www.w3.org/2000/svg" className="h-[14px]">
					<g fill="none" fillRule="evenodd">
						<rect height="14" rx="2.696" stroke="currentColor" width="30" x=".5" y=".5" />
						<path
							d="m9.442 6.8c1.575.056 2.7.08 2.7-1.519 0-1.127-.679-1.256-2.7-1.156zm0 1.387v1.955c0 .757 1.171.907 1.562.907.587 0 .6 1.236.016 1.236h-5.993c-.587 0-.554-1.236 0-1.236.6 0 1.749-.036 1.747-.823v-5.364c-.01-.481-.4-.8-1.731-.809-.587 0-.587-1.333 0-1.333s5.695.028 6.358.012c1.527.039 3.429.021 3.429 2.427 0 1.5-.052 2.758-1.6 2.825zm12.158.427c0-.715.288-.38 2.762-.38 1.827 0 2.589-.254 2.588.349s-1.166-.01-1.39.567.071 2.046-.439 2.394c-1.269301.4409456-2.5972071.6903493-3.94.74-4.819 0-5.021-1.084-5.017-4.578.005-4.494.832-4.972 5.654-4.972 1.083 0 3.292.048 3.4.617.2402579.78759483.2630629 1.62550283.066 2.425-.214.555-1.864.208-1.864.208-.7-.692-.156-1.929-2.2-1.929-2.564 0-2.343 1.517-2.345 3.676 0 1.327-.2 3.224 2.253 3.224.948 0 1.632-.111 1.633-1.345.011-1.196-1.161-.14-1.161-.996z"
							fill="currentColor"
						/>
					</g>
				</svg>
			);
		case 'PG-13':
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="15"
					viewBox="0 0 46 15"
					className="h-[14px]"
				>
					<g fill="none" fillRule="evenodd">
						<path
							d="m2.718544.5c-1.22162488.00794062-2.20651776 1.00315077-2.201544 2.227l-.00000414 9.5480337c-.00497152 1.2222821.9806744 2.2177845 2.20000414 2.2249663l40.5700594.0000086c1.222591-.0071904 2.2083685-1.0031907 2.2029406-2.2280086l.0000041-9.54703369c.0049716-1.22228215-.9806744-2.21778453-2.2000041-2.22496631z"
							stroke="currentColor"
						/>
						<path
							d="m35.17 12.265h-5.217v-.758c.051-.024 1.178.078 1.174-.822v-5.577c-.4155472.23255683-.8810243.36153205-1.357.376v-1.3c.949751-.23834087 1.811597-.7431661 2.484-1.455h1.578v8c0 .867 1.343.786 1.343.786zm4.623-7.212c-.0208394-.30049069-.1760159-.57558005-.4224136-.7488345-.2463977-.17325446-.5577642-.22621462-.8475864-.1441655-.5285494.02980579-1.0175189.28963936-1.338.711-.3942312.23359491-.8746805.27055255-1.3.1l-.01-1.345c.8683948-.55478853 1.8700871-.86565856 2.9-.9 2.04-.039 3.46.9 3.453 2.091-.0071372.7930391-.41853 1.52758824-1.091 1.948.9548954.45726206 1.542504 1.44252135 1.491 2.5 0 2.047-2.435 3.015-4.256 3.015-1.527 0-2.505-.121-2.5-1.386 0-.265-.094-.993.283-.993h.372c.5 0 .146.913 2.067.9.8418724-.0803709 1.5166698-.7315277 1.627-1.57 0-1.743-2.609-1.517-2.609-1.517l.031-1.558s2.15.217 2.15-1.102zm-31.659 1.747c1.58.056 2.71.08 2.71-1.519 0-1.127-.682-1.256-2.71-1.156zm0 1.387v1.955c0 .757 1.175.907 1.567.907.589 0 .605 1.236.016 1.236h-6.017c-.589 0-.556-1.236 0-1.236.6 0 1.755-.036 1.753-.823v-5.364c-.01-.481-.4-.8-1.737-.809-.589 0-.589-1.333 0-1.333s5.714.028 6.38.012c1.532.039 3.44.021 3.44 2.427 0 1.5-.052 2.758-1.605 2.825zm12.204.427c0-.715.289-.38 2.772-.38 1.833 0 2.6-.254 2.6.349s-1.171-.01-1.394.567.071 2.046-.441 2.394c-1.2737851.4409319-2.6059733.6903169-3.953.74-4.835 0-5.038-1.084-5.034-4.578 0-4.494.835-4.972 5.673-4.972 1.087 0 3.3.048 3.416.617.2410527.78746503.2638635 1.62558921.066 2.425-.215.555-1.87.208-1.87.208-.706-.692-.156-1.929-2.208-1.929-2.572 0-2.351 1.517-2.353 3.676 0 1.327-.2 3.224 2.261 3.224.951 0 1.637-.111 1.639-1.345-.003-1.196-1.175-.14-1.174-.996zm7.732-1.794h.919c.252656.04155765.4774673.18427948.6225756.39524317s.197982.47195031.1464244.72275683c.0024181.45219732-.3231338.83955751-.769.915l-1.725-.009c-.2445312.02250898-.4861554-.06657665-.6575496-.24243515-.1713941-.17585851-.2542385-.41969316-.2254504-.66356485-.0580481-.27010278.0078099-.55200951.1795195-.76843713.1717096-.21642763.4312539-.3446673.7074805-.34956287h.8z"
							fill="currentColor"
						/>
					</g>
				</svg>
			);
		case 'R':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" className="h-[14px]">
					<g fill="none" fillRule="evenodd">
						<path
							d="m2.71596415.5c-1.22424849.00496891-2.21302936 1.00097953-2.20896415 2.227l-.00000275 9.547659c-.00406343 1.2246528.98518834 2.2208454 2.20800275 2.225341l14.5671638.0000034c.5882514-.0021603 1.151551-.2379162 1.5659771-.6554031.4144262-.4174869.6460308-.982506.6438591-1.5726003l.0000028-9.546659c.0040634-1.22465278-.9851884-2.22084538-2.2080028-2.225341z"
							stroke="currentColor"
						/>
						<path
							d="m8.812 6.719c1.5.054 2.778.212 2.778-1.393 0-1.13-.851-1.3-2.778-1.2v2.6zm6.332 4.075c.2376852.174479.5107818.2946416.8.352.4 0 .361 1.082.006 1.082-.9914926.0629022-1.9863191.050868-2.976-.036-.5109794-.3214532-.9367257-.7616083-1.241-1.283l-2.921-3.074v2.2c0 .856 1.263.943 1.617.943.533 0 .548 1.239.015 1.239h-5.312c-.532 0-.5-1.239 0-1.239.2672888.0501773.54214932-.0344307.73495139-.2262338s.27883671-.4662203.23004861-.7337662v-5.206c-.007-.485.241-.724-.971-.731-.532 0-.508-1.331.011-1.331s5.917 0 6.54-.009c1.431.03 2.811-.013 2.811 2.316 0 1.456-.505 2.786-1.91 2.855z"
							fill="currentColor"
						/>
					</g>
				</svg>
			);
		case 'Not Rated':
			return <p className="h-fit w-fit rounded-sm text-xs font-medium">NR</p>;

		default:
			return <p className="h-fit w-fit rounded-sm text-xs font-medium">{contentRating}</p>;
	}
}

type ResolutionBadgeProps = {
	resolution: FileMetadata['resolution'];
};

export function ResolutionBadge({ resolution }: ResolutionBadgeProps) {
	switch (resolution) {
		case '1080p':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 15" className="h-[14px]">
					<path
						d="M2.737 0h20.528A2.732 2.732 0 0126 2.727v9.545A2.732 2.732 0 0123.265 15H2.737A2.732 2.732 0 010 12.272V2.727A2.732 2.732 0 012.737 0zM12.5 11.778V3.326h-1.772v3.433H6.921V3.326H5.152v8.452h1.769V8.217h3.807v3.561zm1.409-8.452v8.452h3.257c2.536 0 4.03-1.576 4.03-4.258S19.7 3.326 17.163 3.326h-3.257zm1.769 1.458h1.277c1.558 0 2.437.972 2.437 2.741 0 1.827-.855 2.788-2.437 2.788h-1.28V4.785z"
						fill="currentColor"
						fillRule="evenodd"
					/>
				</svg>
			);
		case '4k':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 15" className="h-[14px]">
					<path
						d="M2.737 0h20.528A2.732 2.732 0 0126 2.727v9.545A2.732 2.732 0 0123.265 15H2.737A2.732 2.732 0 010 12.272V2.727A2.732 2.732 0 012.737 0zm7.078 11.6H11.5v-1.5h1.1V8.681h-1.1v-5.53H9a55.89 55.89 0 00-3.39 5.442V10.1h4.205zM7.162 8.686A39.876 39.876 0 019.815 4.4h.035v4.333H7.162zm8.273 2.914V9.02l.791-.949 2.507 3.529h2.114L17.5 6.9l3.13-3.749h-1.968l-3.174 3.854h-.053V3.151h-1.769V11.6z"
						fill="currentColor"
						fillRule="evenodd"
					/>
				</svg>
			);
		default:
			return <p className="h-fit w-fit rounded-sm text-xs font-medium">{resolution}</p>;
	}
}

type DynamicRangeBadgeProps = {
	dynamicRange: FileMetadata['dynamicRange'];
};

export function DynamicRangeBadge({ dynamicRange }: DynamicRangeBadgeProps) {
	switch (dynamicRange) {
		case 'SDR':
			return null;
		case 'HDR10':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 15" className="h-[14px]">
					<path
						d="M2.72 0h28.557A2.724 2.724 0 0134 2.727v9.545A2.724 2.724 0 0131.277 15H2.72A2.723 2.723 0 010 12.272V2.727A2.723 2.723 0 012.72 0zm9.672 11.6V3.151h-1.769v3.433H6.816V3.151H5.047V11.6h1.769V8.042h3.807V11.6zM13.8 3.151V11.6h3.257c2.536 0 4.03-1.576 4.03-4.258s-1.494-4.194-4.03-4.194H13.8zm1.77 1.459h1.277c1.558 0 2.437.972 2.437 2.741 0 1.827-.855 2.788-2.437 2.788H15.57zM24 4.534h1.53a1.3 1.3 0 011.429 1.347 1.268 1.268 0 01-1.412 1.347H24zm0 3.977h1.447l1.571 3.089h2L27.24 8.247a2.484 2.484 0 001.535-2.4c0-1.669-1.113-2.694-3.057-2.694h-3.491V11.6H24z"
						fill="currentColor"
						fillRule="evenodd"
					/>
				</svg>
			);
		case 'Dolby Vision':
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 22" className="h-[14px]">
					<path
						d="M9.72 14.87l1.927 5.454h.04l1.946-5.453h1.344l-2.806 7.084h-1.077l-2.767-7.084zm7.839 0v7.085h-1.245v-7.084zm9.369 0v7.085h-1.245v-7.084zm5.227 0c.52 0 1 .083 1.438.248.439.165.818.4 1.138.705.32.305.569.675.748 1.11.178.434.268.922.268 1.46 0 .528-.09 1.009-.268 1.444-.18.435-.428.809-.748 1.123-.32.314-.7.559-1.138.733a3.86 3.86 0 01-1.438.262c-.515 0-.99-.087-1.425-.262a3.346 3.346 0 01-1.128-.733 3.36 3.36 0 01-.743-1.123 3.762 3.762 0 01-.268-1.443c0-.54.09-1.027.268-1.462.178-.434.426-.804.743-1.109.316-.305.692-.54 1.128-.705.435-.165.91-.247 1.425-.247zm6.985 0l3.25 5.304h.02v-5.303h1.245v7.084h-1.58l-3.32-5.473h-.02v5.473h-1.246v-7.084zm-17.28.002c.337 0 .68.06 1.026.18.278.097.526.232.746.405l.159.137-.769.854a1.442 1.442 0 00-.53-.413 1.567 1.567 0 00-1.1-.114 1.253 1.253 0 00-.376.162.886.886 0 00-.276.284.791.791 0 00-.108.423c0 .152.031.281.094.389.062.108.148.2.257.275.11.076.242.143.399.2.156.057.328.113.515.17.213.07.433.15.661.238.228.089.438.205.628.351s.347.33.469.55c.122.222.183.497.183.826 0 .361-.066.676-.197.945-.131.27-.306.492-.525.67a2.23 2.23 0 01-.769.398 3.199 3.199 0 01-.928.133c-.431 0-.853-.08-1.265-.242a2.488 2.488 0 01-.875-.565l-.138-.152.844-.797c.162.228.38.408.652.54.271.134.539.2.801.2.137 0 .278-.017.422-.052.144-.035.273-.093.389-.176a.979.979 0 00.281-.308.903.903 0 00.108-.46.758.758 0 00-.122-.442 1.097 1.097 0 00-.328-.304c-.138-.085-.3-.16-.488-.223l-.59-.2c-.2-.062-.4-.138-.6-.227-.2-.089-.38-.206-.54-.351a1.692 1.692 0 01-.388-.537c-.1-.212-.15-.476-.15-.792 0-.342.07-.636.21-.883.141-.247.326-.451.554-.612.228-.162.487-.282.778-.361.29-.08.586-.119.886-.119zm10.304 1.15c-.332 0-.632.061-.9.183-.268.123-.499.29-.692.504a2.28 2.28 0 00-.447.751 2.688 2.688 0 00-.159.934c0 .348.053.668.159.957.105.29.256.542.452.756.196.214.428.38.696.5s.566.178.891.178c.326 0 .624-.06.895-.179s.505-.285.701-.499c.196-.214.347-.466.453-.756.105-.29.158-.609.158-.957a2.69 2.69 0 00-.158-.934 2.29 2.29 0 00-.448-.75 2.075 2.075 0 00-.697-.505 2.179 2.179 0 00-.904-.183zM46.325 3.15l1.993 4.536 1.993-4.536h1.671l-3.962 8.966a1.975 1.975 0 01-2.47 1.075l-.142-.058-.53-.24h-.003l.19-.431.428-.973.219.1a.812.812 0 001.025-.32l.052-.1.004-.01.613-1.402.02-.044.057-.125-2.829-6.438zM39.21.002v3.784a3.446 3.446 0 012-.638c1.928 0 3.496 1.588 3.496 3.541 0 1.953-1.568 3.54-3.496 3.54a3.446 3.446 0 01-2-.638v.64h-1.532V.002zm-2.818 0v10.23h-1.53V.002zm-6.016 3.146c1.928 0 3.496 1.588 3.496 3.54 0 1.953-1.568 3.541-3.496 3.541-1.929 0-3.497-1.588-3.497-3.54 0-1.953 1.568-3.541 3.497-3.541zM21.057 0c2.782 0 5.046 2.292 5.046 5.11s-2.264 5.11-5.046 5.11h-3.645V0zm-6.7 0v10.22h-1.49c-2.78 0-5.045-2.295-5.045-5.11 0-2.743 2.151-4.992 4.833-5.105L12.868 0zM1.488 0c2.78 0 5.046 2.295 5.046 5.11 0 2.743-2.152 4.991-4.833 5.105l-.213.004h-1.49V0zm39.72 4.541c-.926 0-1.719.61-1.999 1.461a2.152 2.152 0 000 1.346 2.11 2.11 0 002 1.463c1.157 0 2.108-.95 2.108-2.135 0-1.172-.951-2.135-2.108-2.135zm-10.833 0c-1.157 0-2.109.95-2.109 2.134 0 1.172.939 2.135 2.109 2.135 1.157 0 2.108-.95 2.108-2.135 0-1.171-.951-2.135-2.108-2.135zm-9.32-2.992h-2.114V8.67h2.115c1.937 0 3.516-1.599 3.516-3.56s-1.58-3.56-3.516-3.56z"
						fill="currentColor"
					/>
				</svg>
			);
		case 'Dolby Vision/HDR10':
			return (
				<>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 15" className="h-[14px]">
						<path
							d="M2.72 0h28.557A2.724 2.724 0 0134 2.727v9.545A2.724 2.724 0 0131.277 15H2.72A2.723 2.723 0 010 12.272V2.727A2.723 2.723 0 012.72 0zm9.672 11.6V3.151h-1.769v3.433H6.816V3.151H5.047V11.6h1.769V8.042h3.807V11.6zM13.8 3.151V11.6h3.257c2.536 0 4.03-1.576 4.03-4.258s-1.494-4.194-4.03-4.194H13.8zm1.77 1.459h1.277c1.558 0 2.437.972 2.437 2.741 0 1.827-.855 2.788-2.437 2.788H15.57zM24 4.534h1.53a1.3 1.3 0 011.429 1.347 1.268 1.268 0 01-1.412 1.347H24zm0 3.977h1.447l1.571 3.089h2L27.24 8.247a2.484 2.484 0 001.535-2.4c0-1.669-1.113-2.694-3.057-2.694h-3.491V11.6H24z"
							fill="currentColor"
							fillRule="evenodd"
						/>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 22" className="h-[14px]">
						<path
							d="M9.72 14.87l1.927 5.454h.04l1.946-5.453h1.344l-2.806 7.084h-1.077l-2.767-7.084zm7.839 0v7.085h-1.245v-7.084zm9.369 0v7.085h-1.245v-7.084zm5.227 0c.52 0 1 .083 1.438.248.439.165.818.4 1.138.705.32.305.569.675.748 1.11.178.434.268.922.268 1.46 0 .528-.09 1.009-.268 1.444-.18.435-.428.809-.748 1.123-.32.314-.7.559-1.138.733a3.86 3.86 0 01-1.438.262c-.515 0-.99-.087-1.425-.262a3.346 3.346 0 01-1.128-.733 3.36 3.36 0 01-.743-1.123 3.762 3.762 0 01-.268-1.443c0-.54.09-1.027.268-1.462.178-.434.426-.804.743-1.109.316-.305.692-.54 1.128-.705.435-.165.91-.247 1.425-.247zm6.985 0l3.25 5.304h.02v-5.303h1.245v7.084h-1.58l-3.32-5.473h-.02v5.473h-1.246v-7.084zm-17.28.002c.337 0 .68.06 1.026.18.278.097.526.232.746.405l.159.137-.769.854a1.442 1.442 0 00-.53-.413 1.567 1.567 0 00-1.1-.114 1.253 1.253 0 00-.376.162.886.886 0 00-.276.284.791.791 0 00-.108.423c0 .152.031.281.094.389.062.108.148.2.257.275.11.076.242.143.399.2.156.057.328.113.515.17.213.07.433.15.661.238.228.089.438.205.628.351s.347.33.469.55c.122.222.183.497.183.826 0 .361-.066.676-.197.945-.131.27-.306.492-.525.67a2.23 2.23 0 01-.769.398 3.199 3.199 0 01-.928.133c-.431 0-.853-.08-1.265-.242a2.488 2.488 0 01-.875-.565l-.138-.152.844-.797c.162.228.38.408.652.54.271.134.539.2.801.2.137 0 .278-.017.422-.052.144-.035.273-.093.389-.176a.979.979 0 00.281-.308.903.903 0 00.108-.46.758.758 0 00-.122-.442 1.097 1.097 0 00-.328-.304c-.138-.085-.3-.16-.488-.223l-.59-.2c-.2-.062-.4-.138-.6-.227-.2-.089-.38-.206-.54-.351a1.692 1.692 0 01-.388-.537c-.1-.212-.15-.476-.15-.792 0-.342.07-.636.21-.883.141-.247.326-.451.554-.612.228-.162.487-.282.778-.361.29-.08.586-.119.886-.119zm10.304 1.15c-.332 0-.632.061-.9.183-.268.123-.499.29-.692.504a2.28 2.28 0 00-.447.751 2.688 2.688 0 00-.159.934c0 .348.053.668.159.957.105.29.256.542.452.756.196.214.428.38.696.5s.566.178.891.178c.326 0 .624-.06.895-.179s.505-.285.701-.499c.196-.214.347-.466.453-.756.105-.29.158-.609.158-.957a2.69 2.69 0 00-.158-.934 2.29 2.29 0 00-.448-.75 2.075 2.075 0 00-.697-.505 2.179 2.179 0 00-.904-.183zM46.325 3.15l1.993 4.536 1.993-4.536h1.671l-3.962 8.966a1.975 1.975 0 01-2.47 1.075l-.142-.058-.53-.24h-.003l.19-.431.428-.973.219.1a.812.812 0 001.025-.32l.052-.1.004-.01.613-1.402.02-.044.057-.125-2.829-6.438zM39.21.002v3.784a3.446 3.446 0 012-.638c1.928 0 3.496 1.588 3.496 3.541 0 1.953-1.568 3.54-3.496 3.54a3.446 3.446 0 01-2-.638v.64h-1.532V.002zm-2.818 0v10.23h-1.53V.002zm-6.016 3.146c1.928 0 3.496 1.588 3.496 3.54 0 1.953-1.568 3.541-3.496 3.541-1.929 0-3.497-1.588-3.497-3.54 0-1.953 1.568-3.541 3.497-3.541zM21.057 0c2.782 0 5.046 2.292 5.046 5.11s-2.264 5.11-5.046 5.11h-3.645V0zm-6.7 0v10.22h-1.49c-2.78 0-5.045-2.295-5.045-5.11 0-2.743 2.151-4.992 4.833-5.105L12.868 0zM1.488 0c2.78 0 5.046 2.295 5.046 5.11 0 2.743-2.152 4.991-4.833 5.105l-.213.004h-1.49V0zm39.72 4.541c-.926 0-1.719.61-1.999 1.461a2.152 2.152 0 000 1.346 2.11 2.11 0 002 1.463c1.157 0 2.108-.95 2.108-2.135 0-1.172-.951-2.135-2.108-2.135zm-10.833 0c-1.157 0-2.109.95-2.109 2.134 0 1.172.939 2.135 2.109 2.135 1.157 0 2.108-.95 2.108-2.135 0-1.171-.951-2.135-2.108-2.135zm-9.32-2.992h-2.114V8.67h2.115c1.937 0 3.516-1.599 3.516-3.56s-1.58-3.56-3.516-3.56z"
							fill="currentColor"
						/>
					</svg>
				</>
			);
		default:
			return <p className="h-fit w-fit rounded-sm text-xs font-medium">{dynamicRange}</p>;
	}
}

export function ClosedCaptionBadge() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 15" className="h-[14px]">
			<g fill="none" fill-rule="evenodd">
				<rect height="14" rx="2.737" stroke="currentColor" width="25" x=".5" y=".5" />
				<path
					d="M8.93 11.75a3.43 3.43 0 003.72-3.081h-1.722a1.908 1.908 0 01-1.991 1.617c-1.353 0-2.2-1.113-2.2-2.917 0-1.781.861-2.9 2.2-2.9a1.958 1.958 0 011.991 1.716h1.722a3.482 3.482 0 00-3.72-3.18c-2.448 0-4 1.646-4 4.369s1.54 4.376 4 4.376zm8.549 0A3.43 3.43 0 0021.2 8.669h-1.724a1.909 1.909 0 01-1.992 1.617c-1.353 0-2.2-1.113-2.2-2.917 0-1.781.861-2.9 2.2-2.9a1.958 1.958 0 011.991 1.716h1.722a3.481 3.481 0 00-3.713-3.18c-2.448 0-4 1.646-4 4.369s1.535 4.376 3.995 4.376z"
					fill="currentColor"
				/>
			</g>
		</svg>
	);
}
