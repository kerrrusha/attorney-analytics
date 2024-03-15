interface SidebarButtonProps {
    name: string;
    url: string;
    isActive: boolean;
    iconUrl: string;
}

export default function SidebarButton({name, url, isActive=false, iconUrl=""} : SidebarButtonProps) {
    return (
        <a className={`${isActive ? "active" : ""} sidebar-button text-decoration-none cursor-pointer`} href={url}>
            <div className="flex">
                <img width={40} src={iconUrl} className="img-white" alt=""/>
            </div>
            <div className="flex flex-1">
                <p className="font-bold fs-5">{name}</p>
            </div>
        </a>
    );
}