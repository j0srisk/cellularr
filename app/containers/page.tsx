import AppleHeader from '@/components/AppleHeader';
import Container from '@/components/Container';
import Heading from '@/components/Heading';

export default function Page() {
	return (
		<div className="flex h-full w-full flex-col px-4">
			<AppleHeader heading="Applications" subheading="4 containers running" />
			<div className="flex h-full w-full flex-col justify-start gap-8 overflow-auto pb-2 pt-4">
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-black">Media</p>
					<div className="flex flex-col gap-[1px] bg-zinc-800">
						<Container name={'Plex'} url={'http://192.168.1.93:32400'} />
						<Container name={'Tautulli'} url={'http://192.168.1.93:8181'} />
						<Container name={'Overseerr'} url={'http://192.168.1.93:5055'} />
						<Container name={'Radarr'} url={'http://192.168.1.93:7878'} />
						<Container name={'Sonarr'} url={'http://192.168.1.93:8989'} />
						<Container name={'Readarr'} url={'http://192.168.1.93:8888'} />
					</div>
				</div>
			</div>
		</div>
	);
}
