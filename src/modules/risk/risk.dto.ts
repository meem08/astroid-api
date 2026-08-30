import { z } from 'zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const assessRiskSchema = z.object({
  amount: z.number().positive(),
  asset: z.string().min(1).default('USDC'),
  knownRecipient: z.boolean().default(false),
  recentTransactionCount: z.number().int().nonnegative().default(0),
  walletAgeDays: z.number().int().nonnegative().default(0),
  policyViolations: z.number().int().nonnegative().default(0),
  hourUtc: z.number().int().min(0).max(23).optional(),
});

export type AssessRiskInput = z.infer<typeof assessRiskSchema>;

// ── Swagger DTO (documentation only — validation is done by Zod pipe) ──

export class AssessRiskDto {
  @ApiProperty({ description: 'Transaction amount', example: 100 })
  amount!: number;

  @ApiPropertyOptional({ description: 'Stellar asset code', example: 'USDC', default: 'USDC' })
  asset?: string;

  @ApiPropertyOptional({ description: 'Whether the recipient is a known address', default: false })
  knownRecipient?: boolean;

  @ApiPropertyOptional({ description: 'Number of recent transactions by this wallet', default: 0 })
  recentTransactionCount?: number;

  @ApiPropertyOptional({ description: 'Age of the wallet in days', default: 0 })
  walletAgeDays?: number;

  @ApiPropertyOptional({ description: 'Number of policy violations for this wallet', default: 0 })
  policyViolations?: number;

  @ApiPropertyOptional({ description: 'Hour of the day in UTC (0-23)', minimum: 0, maximum: 23 })
  hourUtc?: number;
}
