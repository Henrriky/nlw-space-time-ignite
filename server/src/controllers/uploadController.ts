import { randomUUID } from 'node:crypto';
import { extname, resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { createWriteStream } from 'node:fs';
import { promisify } from 'node:util';

import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';

const pump = promisify(pipeline);

export const upload = async (request: FastifyRequest, reply: FastifyReply, app: FastifyInstance) => {

    const upload = await request.file({
        limits: {
            fileSize: 5_242_880, // 5mb
        }
    });

    if (!upload) {
        return reply.status(400).send();       
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);

    if (!isValidFileFormat) {
        return reply.status(400).send();
    }

    const fileId = randomUUID();
    const extension = extname(upload.filename);
    
    const fileNameGenerateByIdAndExtension = fileId.concat(extension);

    const writeStream = createWriteStream(
        resolve(__dirname, '../../uploads/', fileNameGenerateByIdAndExtension)
    )

    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileNameGenerateByIdAndExtension}`, fullUrl).toString();

    return { fileUrl }

}