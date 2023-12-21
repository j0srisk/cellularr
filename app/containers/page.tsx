import Container from '@/components/Container';
import Header from '@/components/Header';
import Seperator from '@/components/ui/Seperator';

export default function Page() {
	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header heading="Containers" subheading="4 Containers Running" />
			<div className="pb-nav no-scrollbar flex h-full w-full flex-col justify-start gap-8 overflow-auto pt-4">
				<div className="flex flex-col gap-3">
					<p className="text-title-3-emphasized">Media</p>
					<div className="flex flex-col gap-[9px]">
						<Container name={'Plex'} url={'http://192.168.1.93:32400'} />
						<Seperator />
						<Container name={'Tautulli'} url={'http://192.168.1.93:8181'} />
						<Seperator />
						<Container name={'Overseerr'} url={'http://192.168.1.93:5055'} />
						<Seperator />
						<Container name={'Radarr'} url={'http://192.168.1.93:7878'} />
						<Seperator />
						<Container name={'Sonarr'} url={'http://192.168.1.93:8989'} />
						<Seperator />
						<Container name={'Readarr'} url={'http://192.168.1.93:8888'} />
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<p className="text-title-3-emphasized">Media</p>
					<div className="flex flex-col gap-[9px]">
						<Container name={'Plex'} url={'http://192.168.1.93:32400'} />
						<Seperator />
						<Container name={'Tautulli'} url={'http://192.168.1.93:8181'} />
						<Seperator />
						<Container name={'Overseerr'} url={'http://192.168.1.93:5055'} />
						<Seperator />
						<Container name={'Radarr'} url={'http://192.168.1.93:7878'} />
						<Seperator />
						<Container name={'Sonarr'} url={'http://192.168.1.93:8989'} />
						<Seperator />
						<Container name={'Readarr'} url={'http://192.168.1.93:8888'} />
					</div>
				</div>
			</div>
		</div>
	);
}
