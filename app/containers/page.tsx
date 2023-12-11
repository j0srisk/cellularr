import Container from '@/components/Container';
import Heading from '@/components/Heading';

export default function Page() {
	return (
		<div className="flex h-full w-full flex-col px-4">
			<Heading heading="Containers" subheading="4 running" />
			<div className="flex h-full w-full flex-col justify-start gap-8 overflow-auto pb-2">
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-semibold">Media</p>
					<Container name={'Plex'} url={'http://192.168.1.93:32400'} />
					<Container name={'Tautulli'} url={'http://192.168.1.93:8181'} />
					<Container name={'Overseerr'} url={'http://192.168.1.93:5055'} />
					<Container name={'Radarr'} url={'http://192.168.1.93:7878'} />
					<Container name={'Sonarr'} url={'http://192.168.1.93:8989'} />
					<Container name={'Readarr'} url={'http://192.168.1.93:8888'} />
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-2xl font-semibold">Unraid</p>
					<Container name={'Unraid'} url={'http://192.168.1.93'} />
					<Container name={'Docker'} url={'http://192.168.1.93/Docker'} />
				</div>
			</div>
		</div>
	);
}
