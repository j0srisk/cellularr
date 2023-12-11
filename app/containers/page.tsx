import Container from '@/components/Container';
import Heading from '@/components/Heading';

export default function Page() {
	return (
		<>
			<Heading heading="Containers" subheading="4 running" />
			<div className="flex w-full flex-col justify-between gap-4 overflow-scroll">
				<p className="text-2xl font-semibold">Media</p>
				<Container
					name={'Plex'}
					url={'http://192.168.1.93:32400'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/plex.svg'
					}
				/>
				<Container
					name={'Overseerr'}
					url={'https://plex.walkxcode.dev'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/overseerr.svg'
					}
				/>
				<Container
					name={'Sonarr'}
					url={'https://plex.walkxcode.dev'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/sonarr.svg'
					}
				/>
				<Container
					name={'Radarr'}
					url={'https://plex.walkxcode.dev'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/radarr.svg'
					}
				/>
				<p className="text-2xl font-semibold">Conroe</p>
				<Container
					name={'Plex'}
					url={'http://192.168.1.93:32400'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/plex.svg'
					}
				/>
				<Container
					name={'Overseerr'}
					url={'https://plex.walkxcode.dev'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/overseerr.svg'
					}
				/>
				<Container
					name={'Sonarr'}
					url={'https://plex.walkxcode.dev'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/sonarr.svg'
					}
				/>
				<Container
					name={'Radarr'}
					url={'https://plex.walkxcode.dev'}
					icon={
						'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/radarr.svg'
					}
				/>
			</div>
		</>
	);
}