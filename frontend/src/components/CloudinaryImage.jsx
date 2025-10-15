import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { scale } from '@cloudinary/url-gen/actions/resize';

const myCld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
});

const Image = ({ src, className }) => {
    const cldImg = myCld.image(src)
        .resize(scale().width("auto"))
        .delivery(quality("auto"))
        .format(auto());
    return <AdvancedImage cldImg={cldImg}
        className={className}
    />
};

export default Image