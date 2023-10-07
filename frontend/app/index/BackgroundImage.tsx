type BackgroundImageType = {
  imgSrc: string
}

const BackgroundImage = ({imgSrc}: BackgroundImageType) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (<img alt="decoration" src={imgSrc} className="filter blur-md opacity-30 fixed inset-0 w-full h-full object-cover"></img>)
}

export default BackgroundImage;