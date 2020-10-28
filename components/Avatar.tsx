const Avatar = ({src = '/me.jpg', width = '100px', height = '100px', ...rest}) => {
    return <img src={src} width={width} height={height} {...rest} className='block rounded-full' />
}

export default Avatar;
