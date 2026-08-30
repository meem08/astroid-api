import { z } from 'zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const exportAuditLogsQuerySchema = z.object({
  agentId: z.string().optional(),
  userId: z.string().optional(),
  actionType: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.coerce.number().int().positive().max(1000).default(100),
  cursor: z.string().optional(),
  format: z.enum(['json', 'csv']).default('json'),
});

export type ExportAuditLogsQuery = z.infer<typeof exportAuditLogsQuerySchema>;

// ── Swagger DTO (documentation only — validation is done by Zod pipe) ──

export class ExportAuditLogsQueryDto {
  @ApiPropertyOptional({ description: 'Filter by agent UUID' })
  agentId?: string;

  @ApiPropertyOptional({ description: 'Filter by user UUID' })
  userId?: string;

  @ApiPropertyOptional({ description: 'Filter by audit action type', example: 'TRANSFER_FUNDS' })
  actionType?: string;

  @ApiPropertyOptional({ description: 'ISO 8601 start date filter', example: '2024-01-01T00:00:00Z' })
  startDate?: string;

  @ApiPropertyOptional({ description: 'ISO 8601 end date filter', example: '2024-12-31T23:59:59Z' })
  endDate?: string;

  @ApiPropertyOptional({ description: 'Maximum number of results (max 1000)', default: 100, maximum: 1000 })
  limit?: number;

  @ApiPropertyOptional({ description: 'Pagination cursor from previous response' })
  cursor?: string;

  @ApiPropertyOptional({ description: 'Export format', enum: ['json', 'csv'], default: 'json' })
  format?: 'json' | 'csv';
}
